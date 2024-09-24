import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { _POST } from "@/api/rootAPI";
import { usersQueryKeys } from "@/api/users";

import { useCartStore } from "@/stores/useCartStore";

import { PlayableContainer } from "@/styles/GlobalStyles";

import { Button } from "@/components";

const KakaoPaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { initCart, orderToken, setOrderToken } = useCartStore();

  const pg_token = searchParams.get("pg_token");

  // const albumsIds = _.chain(items)
  //   .map(item => _.range(item.quantity).map(() => item.product.id))
  //   .flatMap()
  //   .value();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () =>
      await _POST("/payments/kakao-success", {
        tid: orderToken,
        pg_token,
      }),
    onSuccess: () => {
      initCart();
      setOrderToken(null);
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.getSummary });
    },
  });

  useEffect(() => {
    if (!orderToken) return;
    mutate();
  }, []);

  return (
    <PlayableContainer className="flex flex-col h-screen justify-center items-center space-y-4">
      카카오페이 결제가 완료되었습니다.
      <Button variant="link" onClick={() => navigate("/home")}>
        홈으로 가기
      </Button>
    </PlayableContainer>
  );
};

export default KakaoPaymentSuccessPage;