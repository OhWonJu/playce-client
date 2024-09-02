export const UNAUTHORIZED = {
  NOT_AUTHORIZED: {
    message: "NOT AUTHORIZED",
    code: 401000,
  },

  REFRESH_TOKEN_EXPIRED: {
    message: "REFRESH TOKEN EXPIRED",
    code: 401201,
  },

  INVALID_USER: {
    message: "INVALID USER",
    code: 401301,
  },

  INVALID_USER_MATCH: {
    message: "INVALID USER MATCH",
    code: 401302,
  },

  INVALID_ACCOUNT: {
    message: "INVALID ACCOUNT",
    code: 401303,
  },
};

export const INTERNAL_ERROR = {
  message: "SERVER TASK FAILED",
  code: 500,
};

export const ERROR_CODE = {
  401000: "사용자 인증에 실패했어요.",
  401201: "사용자 인증에 실패했어요.",
  401301: "유효한 사용자 정보가 아니에요.",
  401302: "유효한 사용자 정보가 아니에요.",
  401303: "유효한 사용자 정보가 아니에요.",
  
  500: "요청을 처리하는데 문제가 발생했어요.",
};
