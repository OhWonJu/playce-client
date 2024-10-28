import { ERROR_CODE, ErrorCode } from "@/api/errorCode";
import { Button } from "@/components";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (typeof error.message === "string") {
    return (
      <section className="flex flex-col justify-center items-center mx-auto h-[100dvh] space-y-4">
        <span>{ERROR_CODE[error.message as ErrorCode]}</span>
        <span>이용에 불편을 드려 죄송합니다.</span>
        <Button variant="link" onClick={() => window.location.replace("/")}>
          <span>초기 페이지로 돌아가기</span>
        </Button>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center mx-auto h-[100dvh]">
      <p>이용에 불편을 드려 죄송합니다.</p>
      <button onClick={resetErrorBoundary}>다시 시도하기</button>
    </section>
  );
};

export default ErrorFallback;
