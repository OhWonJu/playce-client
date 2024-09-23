import * as _ from "lodash";

import { getkakoPayReady } from "@/lib/getKakaoPayReady";

import { useModal } from "@/stores/useModalStore";
import { useCartStore } from "@/stores/useCartStore";

import { Button } from "@/components/buttons";
import { ProductCard } from "@/components/cards";

import ModalLayout from "../ModalLayout";

const CreatePlaylistModal = () => {
  const onClose = useModal(state => state.onClose);
  const { items, totalItems, setOrderToken } = useCartStore();

  const totalPrice = _.reduce(
    items,
    (acc, curr) => curr.product.price * curr.quantity + acc,
    0,
  );

  const albumIds: string[] = [];
  const quantities: number[] = [];

  _.forEach(items, (value, key) => {
    albumIds.push(key), quantities.push(value.quantity);
  });

  const bodyContent = (
    <div className="flex flex-col gap-y-4 w-full">
      {_.map(items, item => (
        //@ts-ignore
        <ProductCard key={item.product.id} item={item} />
      ))}
    </div>
  );

  // const queryClient = useQueryClient();
  // const { mutate: createNewUserAlbums, isPending } = useMutation({
  //   mutationFn: async () => createUserAlbum(albumsIds),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: usersQueryKeys.getSummary,
  //     });
  //   },
  // });

  const onBuyClick = async () => {
    let itemName = _.take(Object.entries(items), 1)[0][1].product.albumName;

    totalItems > 1 && (itemName = itemName + ` 외 ${totalItems - 1}건`);

    const { next_redirect_pc_url, tid } = await getkakoPayReady({
      albumIds,
      quantities,
      itemName,
      totalAmount: totalPrice,
      quantity: totalItems,
    });

    if (next_redirect_pc_url) {
      setOrderToken(tid);
      window.location = next_redirect_pc_url;
    } else {
      // 에러 처리
    }
  };

  const footerContent = (
    <Button
      variant="ghost"
      width={"100%"}
      size="lg"
      disabled={totalItems < 1}
      className="w-full"
      onClick={onBuyClick}
    >
      <span>{totalPrice.toLocaleString("ko-KR")}원 • 구매하기</span>
    </Button>
  );

  return (
    <ModalLayout
      title={"나의 장바구니"}
      body={bodyContent}
      footer={footerContent}
      onClose={onClose}
      mode="slide"
      containerClassName="w-[full] sm:w-[420px] h-screen"
    />
  );
};

export default CreatePlaylistModal;
