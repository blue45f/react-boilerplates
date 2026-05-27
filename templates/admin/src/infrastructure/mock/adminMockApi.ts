import type { User } from '@/domains/auth/login';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLoginAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  growthRate: number;
  usersDelta: number;
  ordersDelta: number;
  revenueDelta: number;
  growthDelta: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  at: string;
}

export interface ChartPoint {
  date: string;
  revenue: number;
  orders: number;
  users: number;
}

export interface CategorySlice {
  name: string;
  value: number;
}

const FIRST_NAMES = [
  '지훈',
  '서연',
  '도현',
  '하은',
  '민준',
  '수아',
  '예준',
  '지우',
  '준서',
  '서윤',
  '시우',
  '하윤',
  '주원',
  '지유',
  '건우',
  '서아',
  '우진',
  '채원',
  '연우',
  '아린',
];
const LAST_NAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
const ROLES: AdminUser['role'][] = ['admin', 'user', 'editor', 'viewer'];
const STATUSES: AdminUser['status'][] = ['active', 'active', 'active', 'inactive', 'pending'];
const DAY_IN_MS = 86_400_000;

function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function isoDaysAgo(days: number, seed: number): string {
  const base = Date.now();
  const ms = base - days * DAY_IN_MS - (seed % DAY_IN_MS);
  return new Date(ms).toISOString();
}

function utcStartOfToday(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

let userSeed = 0;
function nextId(): string {
  userSeed += 1;
  return `usr_${userSeed.toString().padStart(4, '0')}`;
}

function generateUsers(count: number): AdminUser[] {
  const list: AdminUser[] = [];
  for (let i = 0; i < count; i += 1) {
    const first = pick(FIRST_NAMES, i * 3 + 7);
    const last = pick(LAST_NAMES, i * 5 + 11);
    const role = pick(ROLES, i + 1);
    const status = pick(STATUSES, i * 2 + 3);
    list.push({
      id: nextId(),
      name: `${last}${first}`,
      email: `${last.toLowerCase()}${first}${i}@example.com`,
      role,
      status,
      createdAt: isoDaysAgo(180 - i, i * 9973),
      lastLoginAt: isoDaysAgo((i * 11) % 30, i * 6131),
    });
  }
  return list;
}

let usersDb: AdminUser[] = generateUsers(50);

export const mockApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const jitter = () => (Math.random() - 0.5) * 20;
    return delay(
      {
        totalUsers: 1128 + Math.floor(jitter()),
        totalOrders: 93 + Math.floor(jitter() / 2),
        totalRevenue: 1_250_000 + Math.floor(jitter() * 1000),
        growthRate: Number((11.28 + jitter() / 10).toFixed(2)),
        usersDelta: Number((4.2 + jitter() / 20).toFixed(2)),
        ordersDelta: Number((-1.8 + jitter() / 20).toFixed(2)),
        revenueDelta: Number((8.5 + jitter() / 20).toFixed(2)),
        growthDelta: Number((0.6 + jitter() / 40).toFixed(2)),
      },
      300
    );
  },

  async getActivities(): Promise<Activity[]> {
    const actions = [
      '로그인',
      '주문 생성',
      '설정 변경',
      '사용자 추가',
      '비밀번호 변경',
      '리포트 다운로드',
    ];
    const list: Activity[] = Array.from({ length: 12 }).map((_, i) => ({
      id: `act_${i}`,
      user: pick(LAST_NAMES, i + 1) + pick(FIRST_NAMES, i * 2 + 3),
      action: pick(actions, i),
      target: `리소스 #${(i + 1) * 17}`,
      at: isoDaysAgo(i % 7, i * 311),
    }));
    return delay(list, 250);
  },

  async getChartSeries(rangeDays: number): Promise<ChartPoint[]> {
    const today = utcStartOfToday();
    const out: ChartPoint[] = [];
    for (let i = rangeDays - 1; i >= 0; i -= 1) {
      const d = new Date(today.getTime() - i * DAY_IN_MS);
      const date = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
      const wave = Math.sin(i / 3) * 200 + 800;
      out.push({
        date,
        revenue: Math.floor(wave * 1000 + (i % 5) * 4321),
        orders: Math.floor(wave / 8 + (i % 7) * 3),
        users: Math.floor(wave / 4 + (i % 11) * 5),
      });
    }
    return delay(out, 300);
  },

  async getCategoryBreakdown(): Promise<CategorySlice[]> {
    return delay(
      [
        { name: '의류', value: 4200 },
        { name: '식품', value: 3100 },
        { name: '전자', value: 2750 },
        { name: '도서', value: 1180 },
        { name: '기타', value: 870 },
      ],
      250
    );
  },

  async listUsers(): Promise<AdminUser[]> {
    return delay([...usersDb], 250);
  },

  async getUser(id: string): Promise<AdminUser | undefined> {
    return delay(
      usersDb.find((u) => u.id === id),
      200
    );
  },

  async createUser(input: Omit<AdminUser, 'id' | 'createdAt' | 'lastLoginAt'>): Promise<AdminUser> {
    const now = new Date().toISOString();
    const created: AdminUser = {
      ...input,
      id: nextId(),
      createdAt: now,
      lastLoginAt: now,
    };
    usersDb = [created, ...usersDb];
    return delay(created, 300);
  },

  async updateUser(id: string, patch: Partial<AdminUser>): Promise<AdminUser> {
    usersDb = usersDb.map((u) => (u.id === id ? { ...u, ...patch } : u));
    const found = usersDb.find((u) => u.id === id);
    if (!found) throw new Error('사용자를 찾을 수 없습니다');
    return delay(found, 300);
  },

  async deleteUser(id: string): Promise<{ id: string }> {
    usersDb = usersDb.filter((u) => u.id !== id);
    return delay({ id }, 250);
  },

  async login(credentials: { email: string; password: string }): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('이메일과 비밀번호를 입력하세요');
    }
    if (credentials.password.length < 4) {
      throw new Error('비밀번호가 올바르지 않습니다');
    }
    const user: User = {
      id: 'usr_self',
      name: '관리자',
      email: credentials.email,
      role: 'admin',
    };
    return delay(user, 400);
  },
};
