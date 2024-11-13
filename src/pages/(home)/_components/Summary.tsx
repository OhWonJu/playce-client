import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

import { GetSummaryResponse } from "@/api/users";

import { MusicCard, MusicList } from "@/components";
import MyPlayListSection from "./MyPlayListSection";

const Summary = ({
  summaryQuery,
}: {
  summaryQuery: UseQueryResult<GetSummaryResponse>;
}) => {
  const navigate = useNavigate();

  const summaryData = use(summaryQuery.promise) as GetSummaryResponse;

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

  return (
    <>
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
  );
};

export default Summary;
