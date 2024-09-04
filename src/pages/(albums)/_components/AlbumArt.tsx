import { Button, Image } from "@/components";
import { DotMenu } from "@/components/icons";

import { AlbumArtWrapper, AlbumOverlay } from "./albumArt.styels";

interface AlbumArtProps {
  imageUrl: string;
}

const AlbumArt = ({ imageUrl }: AlbumArtProps) => {
  return (
    <AlbumArtWrapper className="group">
      <Image
        imageUrl={imageUrl}
        alt="album art"
        className="absolute top-0 left-0 object-contain"
        draggable={false}
      />
      <AlbumOverlay>
        <div className="absolute top-1 right-1">
          <Button
            variant="plain"
            useRipple
            size="icon"
            className="p-2 rounded-full border-0"
            // clickHandler={() => console.log("!")}
          >
            <DotMenu fill={"#E3E3E3"} />
          </Button>
        </div>
      </AlbumOverlay>
    </AlbumArtWrapper>
  );
};

export default AlbumArt;
