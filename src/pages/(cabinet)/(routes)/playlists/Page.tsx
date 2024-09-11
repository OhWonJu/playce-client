import { playlistsQueryKeys } from "@/api/playlist";
import { PlaylistCard } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import usePlaylistsQuery from "@/hooks/usePlaylistsQuery";
import useMeStore from "@/stores/useMeStore";
import { PlayableContainer } from "@/styles/GlobalStyles";
import { useInView } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const CabinetPlayListsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "20%",
  });

  const navigate = useNavigate();
  const id = useMeStore(state => state.id);

  const {
    data: playlistsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // status,
    isLoading,
  } = usePlaylistsQuery({
    queryKey: playlistsQueryKeys.playlists(id),
    apiUrl: `/users/playlist/${id}`,
  });

  const onPlaylistClick = (playlistName: string, playlistId: string) =>
    navigate(`/cabinet/playlists/${playlistName}?playlistId=${playlistId}`);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

  return (
    <PlayableContainer>
      <div className=" w-full space-y-2 scrollbar-hide">
        {!isLoading &&
          playlistsData?.pages?.map((group, i) => (
            // @ts-ignore
            <Fragment key={i}>
              {group.playlists.map(playlist => (
                <PlaylistCard
                  key={playlist.id}
                  size="md"
                  data={playlist}
                  onClick={() =>
                    onPlaylistClick(playlist.playListName, playlist.id)
                  }
                />
              ))}
            </Fragment>
          ))}
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              //@ts-ignore
              <Skeleton key={i} className="rounded-lg w-full h-[60px]" />
            ))}
      </div>
      <div ref={ref} />
    </PlayableContainer>
  );
};

export default CabinetPlayListsPage;
