---
sidebar_position: 2
---

# Admin 템플릿

Ant Design을 사용한 관리자 대시보드 템플릿입니다.

## 기술 스택

- **React 18** - 안정적인 React
- **Vite 6** - 빠른 빌드 도구
- **Ant Design 5** - 엔터프라이즈급 UI
- **React Router 7** - 라우팅
- **TypeScript 5** - 타입 안전성

## 프로젝트 구조

```
my-admin/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   └── AdminLayout.tsx   # 사이드바 레이아웃
│   ├── pages/
│   │   ├── Dashboard.tsx     # 대시보드
│   │   ├── Users.tsx         # 사용자 관리
│   │   └── Settings.tsx      # 설정
│   └── styles/
│       └── global.css
├── index.html
└── ...
```

## 기본 페이지

- `/` - 대시보드 (통계 카드)
- `/users` - 사용자 관리 (테이블)
- `/settings` - 설정 (폼)

## 기능

- 접이식 사이드바 메뉴
- 한국어 로케일 적용
- 반응형 레이아웃
