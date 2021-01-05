# Sqoop-Server

## ⚙ Dependencies module

<p align="center">
  <img width="504" alt="스크린샷 2021-01-04 오후 10 09 24" src="https://user-images.githubusercontent.com/69755603/103541194-650d2a80-4ede-11eb-9409-2407e36dde2e.png">
</p>

## 🔗 ER Diagram

<p align="center">
  <img width="500px" alt="DB" src="https://user-images.githubusercontent.com/33858991/103500700-36b42e80-4e8f-11eb-82d1-684fd375c610.PNG">
</p>

## 📃 핵심 기능 설명

우리 서비스의 핵심은 발등에 불 떨어진 취준생에게 **질문을 통해 취준생, 대학생 활동 정리 기능을 제공**하는 것이다.
그렇기에 우리의 핵심 기능은 **질문들과 그에 대한 답변을 통해서 사용자가 자신의 활동을 더욱 구체화할 수 있게하고 그것을 기록**해주는 것이다.
그리고 이렇게 구체화한 활동들을 필요에 따라서 사용자가 찾아볼 수 있어야하기에 각 조건에 따른 필터링 기능 또한 우리의 핵심 기능이다.

### **[Core Feature]**
|Method|Sumary|
|--|--|
|GET|작성해놓은 Question Card 조회| 
|POST|스쿱 저장 누를 때 Question Card 저장|
|PUT|스쿱 수정 누를 때 작성해놓은 Question Card 수정|
|GET|모아보기에서 조건에 따라서 활동을 필터링해서 모아보기|

## 🤝 역할 분담

---

<h2> Together </h2>

- 데이터베이스 설계

---

<h2> 오승재 </h2>

- 활동 정보저장 **[POST]**
- 스쿱 저장 누를떄마다 Question Card **[POST]**
- Question **[GET]**
- 작성해놓은 Question Card **[GET]**
- 작성해놓은 Question Card Update **[PUT]**
- 활동 클릭시, 활동별 Data **[Get]**
- API 명세서 작성

---

<h2> 임찬기 </h2>

- 회원가입 **[POST]**
- 로그인 **[POST]**
- 해시태그 생성 **[POST]**
- 유저별 활동 Data 전체 **[GET]**
- 즐겨찾기 Update **[PUT]**
- 즐겨찾기 활동 전체 **[GET]**
- 유저별 전체 해시테그 **[GET]**
- 활동 필터링 모아보기 **[GET]**

---

## 📕 API Specification

[📖LINK](https://www.notion.so/Sqoop-API-Specification-fb56e53baf514e86b9dbfcf3180a1799)
