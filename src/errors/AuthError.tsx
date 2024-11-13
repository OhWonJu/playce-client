import React from "react";

import { ERROR_CODE, ErrorCode } from "@/api/errorCode";

import { Button } from "@/components";
import { useModal } from "@/stores/useModalStore";

interface AuthErrorProps {
  errorCode: string;
}

const AuthError = ({ errorCode }: AuthErrorProps) => {
  const onOpen = useModal(state => state.onOpen);

  return (
    <section className="flex flex-col justify-center items-center mx-auto h-[100dvh] space-y-4">
      <span>{ERROR_CODE[errorCode as ErrorCode]}</span>
      <span>이용에 불편을 드려 죄송합니다.</span>
      <Button variant="link" onClick={() => onOpen("login")}>
        <span>로그인 하기</span>
      </Button>
      <Button variant="link" onClick={() => window.location.replace("/")}>
        <span>초기 페이지로 돌아가기</span>
      </Button>
    </section>
  );
};

export default AuthError;
