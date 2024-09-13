import { AlbumInfo } from "@/types";

import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { Button } from "@/components";
import { CreditCard, Play, ShoppingBag } from "@/components/icons";

import { AlbumActionBox } from "./albumActions.styles";
import usePlayTimeStore from "@/stores/usePlayTimeStore";
import { useAuthStore } from "@/stores/useAuthStore";

interface AlbumActionsProps {
  album: AlbumInfo;
  isOwn: boolean;
}

const AlbumActions = ({ album, isOwn }: AlbumActionsProps) => {
  const isLogin = useAuthStore(state => state.isLogin);
  const { displayPlayer, onOpen } = usePlayerToggle();
  const setPlayTime = usePlayTimeStore(state => state.setPlayTime);
  const handlePlayListClick = usePlayerControl(
    state => state.handlePlayListClick,
  );

  // TODO: 공통 기능으로 분리 가능하다면 분리
  const albumClickHandler = () => {
    if (!displayPlayer) {
      onOpen();
    }
    setPlayTime(0);
    handlePlayListClick("ALBUM", album);
  };

  if (!isLogin) return null;

  return (
    <AlbumActionBox>
      {isOwn && (
        <Button
          variant="flat"
          useRipple
          onClick={albumClickHandler}
          className="flex justify-around items-center h-full px-4 py-2 min-w-28"
        >
          <Play
            width="22"
            height="22"
            className="fill-secondary stroke-secondary"
          />
          <span className="font-semibold text-secondary pt-1">Play</span>
        </Button>
      )}

      <Button
        variant="flat"
        useRipple
        className="flex justify-around items-center h-full px-4 py-3 min-w-28"
      >
        <CreditCard width="22" height="22" className="stroke-secondary mr-2" />
        <span className="font-semibold text-secondary pt-1">Buy</span>
      </Button>

      <Button
        variant="flat"
        useRipple
        className="flex justify-around items-center h-full px-4 py-3 min-w-28"
      >
        <ShoppingBag width="22" height="22" className="stroke-secondary mr-2" />
        <span className="font-semibold text-sm text-secondary pt-1">
          Add to cart
        </span>
      </Button>
    </AlbumActionBox>
  );
};

export default AlbumActions;
