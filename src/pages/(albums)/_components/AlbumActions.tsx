import { Button } from "@/components";
import { Play } from "@/components/icons";

import { AlbumActionBox } from "./albumActions.styles";

interface AlbumActionsProps {
  isOwn: boolean;
}

const AlbumActions = ({ isOwn }: AlbumActionsProps) => {
  return (
    <AlbumActionBox>
      {isOwn ? (
        <Button
          variant="flat"
          useRipple
          // onClick={() => albumClickHandler(album)}
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
