import { _POST } from "@/api/rootAPI";

const {
  VITE_SERVER_BASE_URL,
  VITE_KAKAOPAY_APPROVAL_URL,
  VITE_KAKAOPAY_FAIL_URL,
  VITE_KAKAOPAY_CANCEL_URL,
} = import.meta.env;

export const getkakoPayReady = async ({
  albumIds,
  quantities,
  itemName,
  quantity,
  totalAmount,
  vatAmount = 0,
  textFreeAmount = 0,
}: {
  albumIds: string[];
  quantities: number[];
  itemName: string;
  quantity: number;
  totalAmount: number;
  vatAmount?: number;
  textFreeAmount?: number;
}) => {
  try {
    if (albumIds.length !== quantities.length)
      throw new Error("상품 정보에 이상이 있습니다.");

    const body = {
      albumIds,
      quantities,
      kakaoPayBody: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: itemName,
        quantity: quantity,
        total_amount: totalAmount,
        vat_amount: vatAmount,
        tax_free_amount: textFreeAmount,
        approval_url: VITE_KAKAOPAY_APPROVAL_URL,
        fail_url: VITE_KAKAOPAY_FAIL_URL,
        cancel_url: VITE_KAKAOPAY_CANCEL_URL,
      },
    };

    const res = await _POST<any>(
      `${VITE_SERVER_BASE_URL}/payments/kakao-ready`,
      body,
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
