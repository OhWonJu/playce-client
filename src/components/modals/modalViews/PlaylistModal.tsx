import React, { Fragment, useEffect, useRef } from "react";
import ModalLayout from "../ModalLayout";
import { useModal } from "@/stores/useModalStore";
import Button from "@/components/Button/Button";
import { Plus } from "@/components/icons";
import usePlaylistsQuery from "@/hooks/usePlaylistsQuery";
import { playlistsQueryKeys } from "@/api/playlist";
import useMeStore from "@/stores/useMeStore";
import { useInView } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaylistCard } from "@/components/cards";

const PlaylistModal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "20%",
  });

  const { id } = useMeStore(); // 모달 data.id 대체 필요F
  const { onClose, onOpen } = useModal();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = usePlaylistsQuery({
    queryKey: playlistsQueryKeys.playlists(id),
    apiUrl: `/users/playlist/${id}`,
  });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

  const handleCreateClick = () => {
    onClose();
    onOpen("createPlaylist", {
      createPlayListData: {
        fromPlaylist: true,
      },
    });
  };

  const bodyContent = (
    <div className=" w-full overflow-y-scroll space-y-2 scrollbar-hide">
      {!isLoading &&
        data?.pages?.map((group, i) => (
          // @ts-ignore
          <Fragment key={i}>
            {group.playlists.map(playlist => (
              <PlaylistCard key={playlist.id} size="sm" data={playlist} />
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
      <div ref={ref} />
    </div>
  );

  const footerContent = (
    <Button
      variant="ghost"
      width={"100%"}
      size="lg"
      useRipple
      className="flex w-full justify-center"
      onClick={handleCreateClick}
    >
      <Plus />
      <span className="ml-2 pt-[2px] text-center content-center ">
        새 플레이리스트
      </span>
    </Button>
  );

  return (
    <ModalLayout
      title={!!data ? "플레이리스트에 곡 추가" : "플레이리스트"}
      body={bodyContent}
      footer={footerContent}
      onClose={onClose}
      // disabled={isLoading}
      containerClassName="w-full sm:w-[420px] h-screen"
      mode="slide"
    />
  );
};

export default PlaylistModal;
