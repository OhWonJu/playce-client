import { Suspense, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { _POST } from "@/api/rootAPI";
import { getSummary } from "@/api/users";
import { getRecommnededAlbums } from "@/api/album";

import { useAuthStore } from "@/stores/useAuthStore";
import useInitScrollPosition from "@/hooks/useInitScrollPosition";

import { MusicList } from "@/components";

import { PlayableContainer } from "@/styles/GlobalStyles";

import { QueueCard, Recommended, Summary } from "../../_components";
import HomeLoading from "./Loading";

const HomePage = () => {
  const ref = useRef(null);
  useInitScrollPosition("home", ref);

  const { isLogin } = useAuthStore();

  const summaryQuery = useQuery(getSummary(isLogin));
  const recommededAlbumsQuery = useQuery(getRecommnededAlbums());

  const replayListRenderer = () => [<QueueCard key={"my-queue"} />];

  return (
    <PlayableContainer ref={ref} className="pb-14 space-y-20">
      <Suspense fallback={<HomeLoading />}>
        {isLogin && (
          <>
            <MusicList
              title="다시 듣기"
              singleLine
              renderer={replayListRenderer}
              hasMore={false}
            />
            <Summary summaryQuery={summaryQuery} />
          </>
        )}
        <Recommended recommededAlbumsQuery={recommededAlbumsQuery} />
        {/* <MusicList title="최신 앨범" exceptionGuide={`작업중`} /> */}
      </Suspense>
    </PlayableContainer>
  );
};

export default HomePage;
