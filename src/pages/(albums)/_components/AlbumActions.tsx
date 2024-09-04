import { AlbumInfo } from "@/types";

import { usePlayerControl } from "@/hooks/usePlayerControl";

import { Button } from "@/components";
import { Play } from "@/components/icons";

import { AlbumActionBox } from "./albumActions.styles";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";

interface AlbumActionsProps {
  album: AlbumInfo;
  isOwn: boolean;
}

const AlbumActions = ({ album, isOwn }: AlbumActionsProps) => {
  const { displayPlayer, onOpen } = usePlayerToggle();
  const { handlePlayListClick, setPlay } = usePlayerControl();

  const albumClickHandler = (album: AlbumInfo) => {
    if (!displayPlayer) {
      onOpen();
    }

    handlePlayListClick("ALBUM", album);

    setTimeout(() => setPlay(true), 800);
  };

  return (
    <AlbumActionBox>
      {isOwn ? (
        <Button
          variant="flat"
          useRipple
          onClick={() => albumClickHandler(album)}
          className="flex justify-around items-center h-full text-base w-28"
        >
          <Play width="22" height="22" fill={"#FFFFFF"} stroke={"#FFFFFF"} />
          <a className="font-semibold text-white">Play</a>
        </Button>
      ) : (
        <>
          <Button
            variant="flat"
            useRipple
            className="grid place-content-center w-28 h-full px-2 py-3 rounded-md bg-black"
          >
            <a className="font-semibold text-white">Buy</a>
          </Button>
          <Button
            variant="flat"
            useRipple
            className="grid place-content-center w-28 h-full px-2 py-3 rounded-md bg-black"
          >
            <a className="font-semibold text-sm text-white">Add To Cart</a>
          </Button>
        </>
      )}
    </AlbumActionBox>
  );
};

export default AlbumActions;
