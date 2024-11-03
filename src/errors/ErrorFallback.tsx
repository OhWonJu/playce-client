import { FallbackProps } from "react-error-boundary";
// import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ERROR_CODE, ErrorCode } from "@/api/errorCode";

import { Button } from "@/components";
import AuthError from "./AuthError";

export const ErrorFallback = ({ error }: FallbackProps) => {
  console.log(
    ERROR_CODE[error.errorCode as ErrorCode],
    error.message,
    error.errorCode,
  );

  // const { reset } = useQueryErrorResetBoundary();

  switch (error.errorCode) {
    case 401:
    case 401000:
    case 401201:
    case 401301:
    case 401302:
    case 401303: {
      return <AuthError errorCode={error.errorCode} />;
    }
    case 500: {
      return (
        <section className="flex flex-col justify-center items-center mx-auto h-[100dvh]">
          <p>예상치 못한 문제가 발생했어요.</p>
          <Button variant="link" onClick={() => window.location.reload()}>
            <span>페이지 새로고침 하기</span>
          </Button>
        </section>
      );
    }
    case "undefined":
    default: {
      return (
        <section className="flex flex-col justify-center items-center mx-auto h-[100dvh]">
          <p>이용에 불편을 드려 죄송합니다.</p>
          <Button variant="link" onClick={() => window.location.replace("/")}>
            <span>초기 페이지로 돌아가기</span>
          </Button>
          {/* <button onClick={resetErrorBoundary}>다시 시도하기</button> */}
        </section>
      );
    }
  }
};

export default ErrorFallback;
