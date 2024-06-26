# news feed backend

based on Nest.js and Node v18.16.0
using TypeORM

## docs

Scalar Module을 이용한 가시적인 docs

- using [scalar](https://www.npmjs.com/package/scalar) for Open API Specification

## 구현

1. 설정 파일 생성 env.example을 참조하여 .env 파일 생성 (아래는 예시 env 파일)

```
MODE=dev

TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_DATABASE=classting
TYPEORM_USERNAME=admin
TYPEORM_PASSWORD=7^bo7YHyYG7qjGc
TYPEORM_LOGGING=true

JWT_SECRET_KEY=Q&yuu84gQZwgSnJ
```

2. `npm i` 명령어를 이용하여 모듈 설치
3. `npm run start`를 이용하여 서버 실행
4. `http://localhost:3000/documentation`사이트에서 api 문서 확인
5. `npm run test`를 이용하여 테스트 코드 실행

## 구현

- [x] 학교 관리자는 학교를 페이지를 운영하여 학교 소식을 발행할 수 있다.
- [x] 학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다.
- [x] 학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다.
- [x] 학교 관리자는 작성된 소식을 삭제할 수 있다.
- [x] 학교 관리자는 작성된 소식을 수정할 수 있다.

- [x] 학생은 학교 페이지를 구독하여 학교 소식을 받아 볼 수 있다.
- [x] 학생은 학교 페이지를 구독할 수 있다.
- [x] 학생은 구독 중인 학교 페이지 목록을 확인할 수 있다.
- [x] 학생은 구독 중인 학교 페이지를 구독 취소할 수 있다.
- [x] 학생은 구독 중인 학교 페이지별 소식을 볼 수 있다.
- [x] 학교별 소식은 최신순으로 노출해야 함

- [x] 학생은 구독 중인 학교 소식을 자신의 뉴스피드에서 모아볼 수 있다.
- [x] 구독중인 모든 학교의 소식을 모아볼 수 있어야 함
- [x] 학교 소식이 노출되는 뉴스피드는 최신순으로 소식을 노출
- [x] 학교 페이지를 구독하는 시점 이후 소식부터 뉴스피드를 받음
- [x] 학교 페이지 구독을 취소해도 기존 뉴스피드에 나타난 소식은 유지해야 함
