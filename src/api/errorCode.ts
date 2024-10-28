export const ERROR_CODE = {
  "Network Error": "서버와의 연결에 실패했습니다.",
  "401": "사용자 인증에 실패했어요.",
  "401000": "사용자 인증에 실패했어요.",
  "401201": "사용자 인증에 실패했어요.",
  "401301": "유효한 사용자 정보가 아니에요.",
  "401302": "유효한 사용자 정보가 아니에요.",
  "401303": "유효한 사용자 정보가 아니에요.",

  "500": "요청을 수행하는 과정에 문제가 발생했어요.",

  undefined: "요청을 수행하는 과정에 문제가 발생했어요.",
};

export type ErrorMessage = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
export type ErrorCode = keyof typeof ERROR_CODE;
