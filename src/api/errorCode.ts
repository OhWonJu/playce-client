export const ERROR_CODE = {
  "401": "ㄹ긍",
  "401000": "사용자 인증에 실패했어요.",
  "401201": "사용자 인증에 실패했어요.",
  "401301": "유효한 사용자 정보가 아니에요.",
  "401302": "유효한 사용자 정보가 아니에요.",
  "401303": "유효한 사용자 정보가 아니에요.",

  "500": "요청을 처리하는데 문제가 발생했어요.",

  undefined: "-",
};

export type ErrorMessage = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
export type ErrorCode = keyof typeof ERROR_CODE;
