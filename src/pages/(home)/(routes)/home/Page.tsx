import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { _POST } from "@/api/rootAPI";
import { getSummary } from "@/api/users";

import { MusicCard, MusicList } from "@/components";
import { useAuthStore } from "@/stores/useAuthStore";

import { PlayableContainer } from "@/styles/GlobalStyles";

import { MyPlayListSection, QueueCard } from "../../_components";

const HomePage = () => {
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const { data: summaryData, isLoading: summaryLoading } = useQuery(
    getSummary(isLogin),
  );

  // 스켈레톤 필요
  if (summaryLoading) return null;

  const replayListRenderer = () => [
    <QueueCard key={"my-queue"} />,
    <MusicCard key={"recent"} title={"최근 들었던 곡1"} size="md" playable />,
    <MusicCard key={"recent2"} title={"최근 들었던 곡2"} size="md" playable />,
    <MusicCard
      key={"recent-playlist"}
      title={"최근 플레이리스트"}
      size="md"
      playable
    />,
  ];

  const myAlbumsRenderer = () =>
    summaryData?.myAlbums.map(album => (
      <MusicCard
        key={album.id}
        title={album.albumName}
        imageUrl={album.albumArtURL}
        subTitle={album.artist.artistName}
        onClick={() =>
          navigate(`/albums/${album.albumName}?albumId=${album.id}`)
        }
      />
    ));

  return (
    <PlayableContainer className="pb-14 space-y-20">
      {/* <Heading title={`반가워요 ${nickName}님`} align="center" /> */}
      {isLogin && (
        <>
          <MusicList
            title="다시 듣기"
            singleLine
            renderer={replayListRenderer}
            hasMore={false}
          />
          <MusicList
            title="나의 앨범"
            renderer={myAlbumsRenderer}
            exceptionGuide="가지고 있는 앨범이 없어요. 멋진 앨범들을 구경해 볼까요?"
            exceptionAction={() => navigate("/explore")}
            hasMoreAction={() => navigate("/cabinet/albums")}
          />
          <MyPlayListSection myPlayList={summaryData.myPlayList} />
        </>
      )}
      <MusicList title="최신 앨범" exceptionGuide={`작업중`} />
      <MusicList title="추천 앨범" exceptionGuide={`작업중`} />
    </PlayableContainer>
  );
};

export default HomePage;
