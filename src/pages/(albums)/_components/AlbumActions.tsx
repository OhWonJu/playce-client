import { AlbumInfo } from "@/types";

import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { Button } from "@/components";
import { Play } from "@/components/icons";

import { AlbumActionBox } from "./albumActions.styles";
import usePlayTimeStore from "@/stores/usePlayTimeStore";

interface AlbumActionsProps {
  album: AlbumInfo;
  isOwn: boolean;
}

const AlbumActions = ({ album, isOwn }: AlbumActionsProps) => {
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

  return (
    <AlbumActionBox>
      {isOwn ? (
        <Button
          variant="flat"
          useRipple
          onClick={albumClickHandler}
          className="flex justify-around items-center h-full text-base w-28"
        >
          <Play width="22" height="22" fill={"#FFFFFF"} stroke={"#FFFFFF"} />
          <span className="font-semibold text-white">Play</span>
        </Button>
      ) : (
        <>
          <Button
            variant="flat"
            useRipple
            className="grid place-content-center w-28 h-full px-2 py-3 rounded-md bg-black"
          >
            <span className="font-semibold text-white">Buy</span>
          </Button>
          <Button
            variant="flat"
            useRipple
            className="grid place-content-center w-28 h-full px-2 py-3 rounded-md bg-black"
          >
            <span className="font-semibold text-sm text-white">
              Add To Cart
            </span>
          </Button>
        </>
      )}
    </AlbumActionBox>
  );
};

export default AlbumActions;
