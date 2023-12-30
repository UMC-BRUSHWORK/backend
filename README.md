# BRUSHWORK-backend

## Branch
###종류<br>
[참고-gitflow 설명](https://techblog.woowahan.com/2553/)

- `main`: 제품 출시 브랜치
- `develop`: 출시를 위해 개발하는 브랜치
  - `feature/{이슈 번호}`: 새로운 기능 개발하는 브랜치
  - `refactor/{이슈 번호}`: 개발된 기능을 리팩터링하는 브랜치
- `hotfix`: 출시 버전에서 발생한 버그를 수정하는 브랜치
- `release`: 이번 출시 버전을 준비하는 브랜치

## Commit Message
[참고1](https://velog.io/@msung99/Git-Commit-Message-Convension) <br>
[참고2](https://doublesprogramming.tistory.com/256) <br>
[참고3](https://overcome-the-limits.tistory.com/6#%EB%8C%80%EC%B6%A9-%EC%8D%BC%EB%8D%98-git-commit-message) <br>
### 구조
```
✨[Feat] 추가 login API   // 타입: 제목
// 깃모지의 경우, 넣어도 되고 안넣어도 되는데 나중에 넣을지 말지 정해야됨

로그인 API 개발               // 본문

Resolves: #123               // 꼬리말 => 이슈 123을 해결했으며,
Ref: #456                                이슈 456 를 참고해야하며,
Related to: #48, #45                     현재 커밋에서 아직 이슈 48 과 45 가 해결되지 않았다.
```
### 제목
- 코드의 변경 사항에 대한 짧은 요약
- 명령조로 간결하게 작성

### 본문 (선택사항)
- 부연 설명이 필요하거나 커밋의 이유를 설명할 경우 작성
- 무엇을 변경했는지 또는 왜 변경했는지 설명하도록 함
- 제목과 구분되기 위해 공백 한 줄을 띄워서 작성
  
### 꼬리말 (선택사항)
- issue tracker id를 작성할 때 사용
- `유형:#이슈 번호` 형식으로 사용
  - `Fixes`: 이슈 수정 중 (미해결)
  - `Resolves`: 이슈 해결
  - `Ref`: 참고할 이슈
  - `Related to`: 해당 커밋에 관련된 이슈번호 (미해결)
    
### Commit Type
- `Feat` : 새로운 기능을 추가하는 경우
- `Fix` : 버그를 고친경우
- `Docs` : 문서를 수정한 경우
- `Style` : 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는경우
- `Refactor` : 코드 리펙토링
- `Test` : 테스트 코드. 리펙토링 테스트 코드를 추가했을 때
- `Chore` : 빌드 업무 수정, 패키지 매니저 수정 (
- `Design` : CSS 등 사용자가 UI 디자인을 변경했을 때
- `Rename` : 파일명(or 폴더명) 을 수정한 경우
- `Remove` : 코드(파일) 의 삭제가 있을 때. "Clean", "Eliminate" 를 사용하기도 함

- - -
## Gitmoji
[깃모지 공식 사이트](https://gitmoji.dev/) <br>
[깃모지 참고](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-Gitmoji-%EC%82%AC%EC%9A%A9%EB%B2%95-Gitmoji-cli) <br>
[gitmoji-cli](https://tngusmiso.tistory.com/57) <br>

### 깃모지 예시
아이콘|코드|설명|원문
---|---|---|---
🔥|`:fire:`|코드/파일 삭제|Remove code or files.
🐛|`:bug:`|버그 수정|Fix a bug.
🚑|`:ambulance:`|긴급 수정|Critical hotfix.
✨|`:sparkles:`|새 기능|Introduce new features.
📝|`:memo:`|문서 추가/수정|Add or update documentation.
🎉|`:tada:`|프로젝트 시작|Begin a project.
♻️|`:recycle:`|코드 리팩토링|Refactor code.

- - -
## Project 경로
```
📦brushwork_be
 ┣ 📂config
 ┃ ┣ 📜db.connect.js
 ┃ ┣ 📜error.js
 ┃ ┣ 📜response.js
 ┃ ┗ 📜response.status.js
 ┣ 📂public
 ┃ ┗ 📜favicon.ico
 ┣ 📂src
 ┃ ┣ 📂controllers
 ┃ ┣ 📂dtos
 ┃ ┣ 📂middleware
 ┃ ┣ 📂models
 ┃ ┣ 📂providers
 ┃ ┣ 📂routes
 ┃ ┗ 📂services
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜babel.config.json
 ┣ 📜index.js
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜swagger-output.json
 ┣ 📜swagger.js
 ┗ 📜yarn.lock
```
