module.exports = {
  NULL_VALUE: "필요한 값이 없습니다.",
  OUT_OF_VALUE: "파라미터 값이 잘못 되었습니다.",
  OUT_OF_SIZE: "파일이 제한 크기를 초과하였습니다.",

  /* Member */
  MEMBER_CREATE_SUCCESS: "회원 생성 성공",
  MEMBER_READ_SUCCESS: "회원 조회 성공",
  MEMBER_READ_ALL_SUCCESS: "전체 회원 조회성공",
  MEMBER_UPDATE_SUCCESS: "회원 수정 성공",
  MEMBER_DELETE_SUCCESS: "회원 삭제 성공",

  /* 회원가입 */
  SIGN_UP_SUCCESS: "회원 가입 성공.",
  SIGN_UP_FAIL: "회원 가입 실패.",
  SIGN_IN_SUCCESS: "로그인 성공.",
  SIGN_IN_FAIL: "로그인 실패.",
  ALREADY_ID: "존재하는 ID 입니다.",
  ALREADY_PHONE: "존재하는 핸드폰 번호 입니다.",
  NO_USER: "존재하지않는 유저 id 입니다.",
  ALREADY_EMAIL: "이미 존재하는 이메일 입니다.",
  NO_EMAIL: '존재하지 않는 이메일 입니다.',
  MISS_MATCH_PW: "비밀번호가 일치하지 않습니다",

  /* User */
  READ_USER_SUCCESS: "사용자 조회 성공",
  READ_USER_ALL_SUCCESS: "전체 사용자 조회 실패",
  READ_USER_FAIL: "사용자 조회 성공",
  READ_USER_ALL_FAIL: "전체 사용자 조회 실패",
  UPDATE_USER_SUCCESS: "사용자 업데이트 성공",
  UPDATE_USER_FAIL: "사용자 업데이트 실패",
  DELETE_USER_SUCCESS: "사용자 삭제 성공",
  DELETE_USER_FAIL: "사용자 삭제 실패",
  FIND_EMAIL_SUCCESS: "사용자 이메일 찾기 성공",
  FIND_EMAIL_FAIL: "사용자 이메일 찾기 실패",
  RESET_PASSWORD_SUCCESS: "사용자 비밀번호 초기화 성공",
  RESET_PASSWORD_FAIL: "사용자 비밀번호 초기화 실패",
  PHONE_CHECK_SUCCESS: "핸드폰 중복체크 성공",
  PHONE_CHECK_FAIL: "핸드폰 중복체크 실패",
  EMAIL_CHECK_SUCCESS: "이메일 중복체크 성공",
  EMAIL_CHECK_FAIL: "이메일 중복체크 싱패",
  DELETE_ACCOUNT_SUCCESS: "계정 삭제 성공",
  DELETE_ACCOUNT_FAIL: "계정 삭제 실패",
  SET_MARKETING_SUCCESS: "마케팅 수신 설정 성공",
  SET_MARKETING_FAIL: "마케팅 수신 설정 실패",
  CHANGE_PW_SUCCESS: "비밀번호 변경 성공",
  CHANGE_PW_FAIL: "비밀번호 변경 실패",
  GET_USER_SET_SUCCESS: "유저 계정 설정 조회 성공",
  GET_USER_SET_FAIL: "유저 계정 설정 조회 실패",


  /* Mypage */
  GET_MY_PAGE_SUCCESS: '마이페이지 조회 성공',
  GET_MY_PAGE_FAIL: '마이페이지 조회 실패',
  UPDATE_MY_PAGE_SUCCESS: '마이페이지 수정 성공',
  UPDATE_MY_PAGE_FAIL: '마이페이지 수정 실패',

  /* Post */
  CREATE_POST_SUCCESS: "게시글 생성 완료",
  CREATE_POST_FAIL: "게시글 생성 실패",
  READ_POST_FAIL: "게시글 조회 성공",
  READ_POST_ALL_FAIL: "전체 게시글 조회 실패",
  UPDATE_POST_SUCCESS: "게시글 업데이트 성공",
  UPDATE_POST_FAIL: "게시글 업데이트 실패",
  DELETE_POST_SUCCESS: "게시글 삭제 성공",
  DELETE_POST_FAIL: "게시글 삭제 실패",

  /* 프로필 */
  READ_PROFILE_SUCCESS: "프로필 조회 성공",
  READ_PROFILE_FAIL: "프로필 조회 실패",

  /* 활동 */
  NO_ACTIVITY: '저장된 활동이 없습니다',
  NO_DATE: '날짜를 입력받지 못하였습니다',
  CREATE_ACTIVITY_SUCCESS: '활동 생성 성공',
  CREATE_ACTIVITY_FAIL: '활동 생성 실패',
  UPDATE_ACTIVITY_SUCCESS: '활동 정보 수정 성공',
  UPDATE_ACTIVITY_FAIL: '활동 정보 수정 실패',
  GET_ACTIVITY_SUCCESS: '선택한 활동 가져오기 성공',
  LIKE_ACTIVITY_SUCCESS: '즐겨찾기 추가 및 해제 성공',
  LIKE_ACTIVITY_FAIL: '즐겨찾기 추가/해제 실패',
  GET_ALL_ACTIVITY_SUCCESS: '전체 활동 가져오기 성공',
  GET_ALL_LIKE_ACTIVITY_SUCCESS: '전체 즐겨찾기 가져오기 성공',
  GET_ACTIVITY_FAIL: '선택한 활동 가져오기 실패',
  GET_ALL_ACTIVITY_FAIL: '전체활동 가져오기 실패',
  GET_ALL_LIKE_ACTIVITY_FAIL: '전체 즐겨찾기 가져오기 실패',
  GET_FILTERED_ACTIVITY_SUCCESS: '전체 활동 필터링 가져오기 성공',
  GET_FILTERED_ACTIVITY_FAIL: '전체 활동 필터링 가져오기 실패',
  GET_ALL_DATE_SUCCESS: '전체 활동 날짜(월) 가져오기 성공',
  GET_ALL_DATE_FAIL: '전체 활동 날짜(월) 가져오기 실패',

  GET_MONTHLY_ACTIVITY_SUCCESS: '월별 활동 가져오기 성공',
  GET_MONTHLY_ACTIVITY_FAIL: '월별 활동 가져오기 실패',

  GET_INCOMPLETE_ACTIVITY_SUCCESS: '작성 중인 활동 가져오기 성공',
  GET_INCOMPLETE_ACTIVITY_FAIL: '작성 중인 활동 가져오기 실패',
  DELETE_ACTIVITY_SUCCESS: '활동 삭제 성공',
  DELETE_ACTIVITY_FAIL: '활동 삭제 실패',




  /* 질문 */
  GET_QUESTION_SUCCESS: '질문 가져오기 성공',
  GET_QUESTION_FAIL: '질문 가져오기 실패',

  /* 질문카드 */
  CREATE_CARD_SUCCESS: '카드 생성 성공',
  CREATE_CARD_FAIL: '카드 생성 실패',
  GET_CARD_SUCCESS: '카드 조회 성공',
  GET_CARD_FAIL: '카드 조회 성공',
  UPDATE_CARD_SUCCESS: '카드 수정 성공',
  UPDATE_CARD_FAIL: '카드 수정 실패',

  /* 토큰 */
  EMPTY_TOKEN: '토큰 값이 없습니다.',
  EXPIRED_TOKEN: '토큰 값이 만료되었습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰값입니다.',
  AUTH_SUCCESS: '인증에 성공했습니다.',
  ISSUE_SUCCESS: '새로운 토큰이 생성되었습니다.',

  /* 해시태그 */
  CREATE_HASHTAG_SUCCESS: '해시태그 생성 성공',
  CREATE_HASHTAG_FAIL: '해시태그 생성 실패',
  GET_HASHTAG_SUCCESS: '해시태그 조회 성공',
  GET_HASHTAG_FAIL: '해시태그 조회 실패',

  /* 서버에러 */
  INTERNAL_SERVER_ERROR: "서버 내부 오류",
}