import { MutationResponse } from "../axios/axiosInstance.types";
import { _POST } from "../rootAPI";

export async function cofirmKakaoPayPayment({
  pg_token,
  tid,
}: {
  tid: string;
  pg_token: string;
}) {
  const res = await _POST<MutationResponse>("/payments/kakao-success", {
    tid,
    pg_token,
  });

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
