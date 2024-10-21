import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-[100dvh] space-y-4">
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
      <Button variant="link" onClick={() => navigate(-1)}>
        이전 페이지로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
