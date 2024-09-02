export const UNAUTHORIZED = {
  REFRESH_TOKEN_EXPIRED: {
    message: "REFRESH TOKEN EXPIRED",
    code: 404201,
  },

  INVALID_USER: {
    message: "INVALID USER",
    code: 404301,
  },

  INVALID_ACCOUNT: {
    message: "INVALID ACCOUNT",
    code: 404302,
  },
};

export const INTERNAL_ERROR = {
  message: "SERVER TASK FAILED",
  code: 500,
};

export const ERROR_CODE = {
  404201: "REFRESH TOKEN EXPIRED",

  404301: "INVALID USER",

  404302: "INVALID ACCOUNT",

  500: "SERVER TASK FAILED",
};
