import {
  AlbumInfoWrapper,
  AlbumUtilsWrapper,
} from "@/pages/(albums)/(routes)/[albumId]/page.styles";
import { AlbumArt, AlbumInfo } from "@/pages/(albums)/_components";
import {
  PlayButtonAction,
  PlaylistTrackList,
} from "@/pages/(cabinet)/_components";
import { useQueue } from "@/stores/useQueue";

import { PlayableContainer } from "@/styles/GlobalStyles";

const CabinetQueuePage = () => {
  const { queue, queueThumbNail, songCount, totalPlayTime } = useQueue();

  return (
    <PlayableContainer>
      <AlbumInfoWrapper>
        <AlbumArt
          imageUrl={
            queueThumbNail.length < 4 ? queueThumbNail[0] : queueThumbNail
          }
        />

        <AlbumUtilsWrapper>
          <AlbumInfo
            albumName={"My Queue"}
            songCount={songCount}
            totalPlayTime={totalPlayTime}
          />
          <PlayButtonAction playlistId={"queue"} tracks={queue} />
        </AlbumUtilsWrapper>
      </AlbumInfoWrapper>

      <PlaylistTrackList
        isOwn={true}
        tracks={queue}
        trackListType={"QUEUE"}
        className="mt-8"
      />
    </PlayableContainer>
  );
};

export default CabinetQueuePage;
