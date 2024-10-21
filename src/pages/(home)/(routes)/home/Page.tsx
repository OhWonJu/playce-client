import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { _POST } from "@/api/rootAPI";
import { getSummary } from "@/api/users";

import { useAuthStore } from "@/stores/useAuthStore";
import useInitScrollPosition from "@/hooks/useInitScrollPosition";

import { MusicCard, MusicList } from "@/components";

import { PlayableContainer } from "@/styles/GlobalStyles";

import { MyPlayListSection, QueueCard } from "../../_components";
import { getRecommnededAlbums } from "@/api/album";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const ref = useRef(null);
  useInitScrollPosition("home", ref);

  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const { data: summaryData, isLoading: summaryLoading } = useQuery(
    getSummary(isLogin),
  );

  const { data: recommendedAlbums, isLoading: recommendedLoading } = useQuery(
    getRecommnededAlbums(),
  );

  // 스켈레톤 필요
  if (summaryLoading) return null;

  const replayListRenderer = () => [<QueueCard key={"my-queue"} />];

  const myAlbumsRenderer = () =>
    summaryData?.myAlbums.map(album => (
      <MusicCard
        key={album.id}
        title={album.albumName}
        imageUrl={album.albumArtURL}
        subTitle={album.artist.artistName}
        usePriority={true}
        useLazy={false}
        onClick={() =>
          navigate(`/albums/${album.albumName}?albumId=${album.id}`)
        }
      />
    ));

  const recommendedAlbumsRenderer = () => {
    //@ts-ignore
    if (recommendedLoading) return [<Skeleton key="loading" />];
    else
      return recommendedAlbums.map(album => (
        <MusicCard
          key={`recommend-${album.id}`}
          title={album.albumName}
          imageUrl={album.albumArtURL}
          subTitle={album.artist.artistName}
          onClick={() =>
            navigate(`/albums/${album.albumName}?albumId=${album.id}`)
          }
        />
      ));
  };

  return (
    <PlayableContainer ref={ref} className="pb-14 space-y-20">
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
            // exceptionAction={() => navigate("/explore")}
            // Explore 페이지 개발 전 임시 기능 //
            exceptionAction={() => {
              const target = document.getElementById("recommended");

              target.scrollIntoView({
                behavior: "smooth",
              });
            }}
            hasMoreAction={() => navigate("/cabinet/albums")}
          />
          <MyPlayListSection myPlayList={summaryData.myPlayList} />
        </>
      )}
      <MusicList
        id="recommended"
        title="추천 앨범"
        renderer={recommendedAlbumsRenderer}
        exceptionGuide={`작업중`}
      />
      {/* <MusicList title="최신 앨범" exceptionGuide={`작업중`} /> */}
    </PlayableContainer>
  );
};

export default HomePage;
