# Sqoop-Server

## 🙋‍♂️Profile
|이름|<h2>오승재</h2>|<h2>임찬기</h2>|
|--|--|--|
| |<img width="250px" alt="Image" src="https://user-images.githubusercontent.com/69755603/104560591-6f22ec00-5689-11eb-80d3-9c557fda47f4.png">|<img width="250px" alt="Image" src="https://user-images.githubusercontent.com/69755603/104560588-6d592880-5689-11eb-827b-ffe129c2514c.png">| 
|역할|리드 서버 개발자|서버 개발자|
|Github|<a href="https://github.com/oh980225">oh980225</a>|<a href="https://github.com/Lim-Changi">Lim-Changi</a>|


## ⚙ Dependencies module

~~~javascript
  "dependencies": {
    "aws-sdk": "^2.817.0",
    "clean-css": "~4.1.11",
    "constantinople": "~3.1.1",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "install": "^0.13.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.2.5",
    "sequelize": "^6.3.5",
    "sequelize-cli": "^6.2.0"
  }
~~~

## 🔗 ER Diagram

<p align="center">
  <img width="550px" alt="DB" src="https://user-images.githubusercontent.com/33858991/104153030-9dec5880-5424-11eb-811f-2217e0b98120.PNG">
</p>

## 👨🏻‍🤝‍👨🏻 Database Relationship

```js
// 1 : N 관계 User : Activity
db.User.hasMany(db.Activity, { onDelete: 'cascade' });
db.Activity.belongsTo(db.User);

// 1 : N 관계 User : Education
db.User.hasMany(db.Education, { onDelete: 'cascade' });
db.Education.belongsTo(db.User);

// 1 : N 관계 Activity : QuestionCard
db.Activity.hasMany(db.QuestionCard, { onDelete: 'cascade' });
db.QuestionCard.belongsTo(db.Activity);

// 1 : N 관계 Activity : Hashtag
db.Activity.hasMany(db.Hashtag, { onDelete: 'cascade' });
db.Hashtag.belongsTo(db.Activity);
```

## 🧱 Server Architecture
<p align="center">
  <img width="900px" alt="Architecture" src="https://user-images.githubusercontent.com/69755603/104559074-2ec26e80-5687-11eb-8eb2-5c17ff921453.png">
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
- 아키텍쳐 작성

---

## 📕 API Specification

[📖LINK](https://www.notion.so/Sqoop-API-Specification-fb56e53baf514e86b9dbfcf3180a1799)
