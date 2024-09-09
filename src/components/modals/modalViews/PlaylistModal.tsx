import React, { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import {
  getPlaylist,
  playlistsQueryKeys,
  updatePlaylistTrack,
  UpdatePlaylistTrackRequest,
} from "@/api/playlist";

import usePlaylistsQuery from "@/hooks/usePlaylistsQuery";
import { useModal } from "@/stores/useModalStore";
import useMeStore from "@/stores/useMeStore";

import { Plus } from "@/components/icons";
import Button from "@/components/Button/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaylistCard } from "@/components/cards";

import ModalLayout from "../ModalLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePlayerControl } from "@/stores/usePlayerControl";
import { Track } from "@/types";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";

const PlaylistModal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "20%",
  });
  const { id } = useMeStore(); // 모달 data.id 대체 필요F
  const { onClose, onOpen, data } = useModal();
  const { displayPlayer, onOpen: onPlayerOpen } = usePlayerToggle();
  const handlePlayListClick = usePlayerControl(
    state => state.handlePlayListClick,
  );

  const {
    data: playlistsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = usePlaylistsQuery({
    queryKey: playlistsQueryKeys.playlists(id),
    apiUrl: `/users/playlist/${id}`,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({
      playlistId,
      data,
    }: {
      playlistId: string;
      data: UpdatePlaylistTrackRequest;
    }) => await updatePlaylistTrack({ playlistId, data }),
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries({
        queryKey: playlistsQueryKeys.playlists(id),
      });
    },
    onError: () => {
      console.log("FAILED");
    },
  });

  const handleCreateClick = () => {
    onClose();
    onOpen("createPlaylist", {
      createPlayListData: {
        fromPlaylist: true,
      },
    });
  };

  const handleItemClick = (playlistId: string, tracks: Track[]) => {
    if (data) {
      mutate({ playlistId, data: data.playlist });
      onClose();
    } else {
      !displayPlayer && onPlayerOpen();
      handlePlayListClick("LIST", { id: playlistId, tracks });
      onClose();
    }
  };

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

  const bodyContent = (
    <div className=" w-full overflow-y-scroll space-y-2 scrollbar-hide">
      {!isLoading &&
        playlistsData?.pages?.map((group, i) => (
          // @ts-ignore
          <Fragment key={i}>
            {group.playlists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                size="sm"
                data={playlist}
                onClick={handleItemClick}
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
