---
sidebar_position: 1
---

# react-scaffolding vs react-boilerplates

`react-scaffolding`과 `react-boilerplates`는 같은 React 출발점을 다루지만 목적성이 다릅니다.

| 구분      | react-scaffolding                              | react-boilerplates                                                   |
| --------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| 핵심 목적 | 하나의 앱을 빠르게 시작하는 실행 가능한 스타터 | 여러 유형의 React 프로젝트를 생성하고 유지하는 보일러플레이트 플랫폼 |
| 산출물    | 독립 실행 가능한 App 프로젝트 구조             | App, Admin, Library 템플릿과 CLI, 공유 설정, 문서, CI/CD             |
| 관심 범위 | 앱 내부 아키텍처, 라우팅, 상태, 테스트 패턴    | 템플릿 배포, 생성기 UX, 의존성 catalog, 품질 게이트, 릴리스 운영     |
| 사용 시점 | 새 웹 앱을 바로 개발할 때                      | 팀/조직에서 반복 생성할 React 프로젝트 표준을 관리할 때              |
| 확장 방향 | 기능 도메인, 페이지, API 연동을 추가           | 템플릿 종류, 공유 config, CLI 옵션, 검증 파이프라인을 추가           |

## 관계

이 저장소의 `templates/app`은 `react-scaffolding`의 앱 구조를 하나의 템플릿으로 포함합니다.

즉, `react-scaffolding`은 App 템플릿의 기준 아키텍처이고, `react-boilerplates`는 그 앱 템플릿을 포함해 Admin 대시보드와 Library 템플릿까지 생성/검증/문서화하는 상위 시스템입니다.

## 선택 기준

| 상황                                                                              | 권장 선택                                       |
| --------------------------------------------------------------------------------- | ----------------------------------------------- |
| 일반 웹 앱 하나를 만들고 싶다                                                     | `npx create-react-bp my-app --template app`     |
| 관리자 대시보드가 필요하다                                                        | `npx create-react-bp my-admin --template admin` |
| 컴포넌트 라이브러리나 디자인 시스템을 만들고 싶다                                 | `npx create-react-lib my-lib`                   |
| 여러 팀의 React 시작점을 표준화하고 싶다                                          | `react-boilerplates`를 기준 저장소로 운영       |
| 기존 `react-scaffolding` 앱 아키텍처를 유지하면서 생성형 템플릿으로 배포하고 싶다 | `templates/app`을 기준으로 수정                 |

## 아키텍처 책임

`react-scaffolding`이 책임지는 영역은 앱 런타임 내부입니다.

- Provider 조립
- Data Router 기반 라우팅
- feature 단위 도메인 구조
- TanStack Query와 Zustand 상태 관리
- i18n, 접근성, E2E 테스트 패턴

`react-boilerplates`가 책임지는 영역은 템플릿 운영 체계입니다.

- `create-react-bp`, `create-react-lib` CLI
- `templates/app`, `templates/admin`, `templates/lib` 템플릿 소스
- `@repo/*-config` 공유 설정
- pnpm catalog 기반 의존성 정렬
- 템플릿별 `verify`, `verify:push`, security audit
- Docusaurus 문서와 CI/CD

## 유지보수 원칙

`react-scaffolding`에서 앱 내부 구조가 좋아지면 `templates/app`에 반영합니다.

반대로 `react-boilerplates`에서 CLI, catalog, 공유 설정, CI, 보안 감사가 좋아지면 모든 템플릿에 적용 가능한 운영 개선으로 반영합니다. 이 구분을 지키면 앱 아키텍처 개선과 보일러플레이트 플랫폼 개선이 섞이지 않아 변경 범위와 테스트 범위가 명확해집니다.
