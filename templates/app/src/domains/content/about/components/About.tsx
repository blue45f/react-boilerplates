import { useTranslation } from 'react-i18next'

import styles from './About.module.css'

import useDocumentTitle from '@/shared/lib/hooks/useDocumentTitle'

function About() {
  const { t } = useTranslation()
  useDocumentTitle(t('about.title'))
  const teamMembers = [
    { name: '김개발', role: 'Frontend Developer', emoji: '👨‍💻' },
    { name: '이디자인', role: 'UI/UX Designer', emoji: '🎨' },
    { name: '박백엔드', role: 'Backend Developer', emoji: '🔧' },
  ]

  return (
    <div className={styles.about}>
      <section className={styles.intro}>
        <h1>{t('about.title')}</h1>
        <p>{t('about.intro')}</p>
      </section>

      <section className={styles.section}>
        <h2>{t('about.techStackTitle')}</h2>
        <ul className={styles.techList}>
          <li>
            <strong>React 19</strong> - Actions, useId, ref as prop 등 최신 기능
          </li>
          <li>
            <strong>TypeScript</strong> - 타입 안정성과 개발 경험 향상
          </li>
          <li>
            <strong>Vite</strong> - 빠른 개발 서버와 빌드 도구
          </li>
          <li>
            <strong>React Router 7</strong> - 데이터 라우터 기반 선언적 라우팅
          </li>
          <li>
            <strong>TanStack Query</strong> - 서버 상태 캐싱·동기화
          </li>
          <li>
            <strong>Zustand</strong> - 가벼운 클라이언트 전역 상태
          </li>
          <li>
            <strong>React Hook Form + Zod</strong> - 폼 처리·런타임 검증
          </li>
          <li>
            <strong>CSS Modules</strong> - 스코프된 스타일링
          </li>
          <li>
            <strong>ESLint + Prettier + Husky</strong> - 코드 품질·포맷 자동화
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>{t('about.teamTitle')}</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <span className={styles.emoji}>{member.emoji}</span>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>{t('about.structureTitle')}</h2>
        <pre className={styles.codeBlock}>
          {`src/
├── assets/          # 정적 파일 및 스타일
├── components/      # 공통/레이아웃 UI 컴포넌트
├── features/        # 도메인 모듈 (스키마·API·쿼리)
├── hooks/           # 커스텀 훅
├── i18n/            # i18next 설정 및 로케일
├── pages/           # 페이지 컴포넌트
├── router/          # createBrowserRouter 라우트 정의
├── services/        # API 서비스
├── store/           # Zustand 전역 스토어
├── types/           # TypeScript 타입 정의
└── utils/           # 유틸리티 함수`}
        </pre>
      </section>
    </div>
  )
}

export default About
