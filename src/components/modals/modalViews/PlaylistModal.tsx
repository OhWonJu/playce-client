import React, { Fragment, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  getTracksByPlaylist,
  playlistsQueryKeys,
  updatePlaylistTrack,
  UpdatePlaylistTrackRequest,
} from "@/api/playlist";

import { Track } from "@/types";

import usePlaylistsQuery from "@/hooks/usePlaylistsQuery";
import { useModal } from "@/stores/useModalStore";
import useMeStore from "@/stores/useMeStore";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { Plus } from "@/components/icons";
import Button from "@/components/buttons/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaylistCard } from "@/components/cards";
import { TrackToast } from "@/components/Toastify";

import ModalLayout from "../ModalLayout";

const PlaylistModal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "20%",
  });

  const { id } = useMeStore(); // 모달 data.id 대체 필요F
  const { isOpen, onClose, onOpen, data } = useModal();
  const { displayPlayer, onOpen: onPlayerOpen } = usePlayerToggle();
  const currentPlaylistId = usePlayerControl(state => state.originTrackListId);
  const handlePlayListClick = usePlayerControl(
    state => state.handlePlayListClick,
  );
  const addPlayListTrack = usePlayerControl(state => state.addTrack);

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

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

  const queryClient = useQueryClient();
  const { mutate: updatePlaylist } = useMutation({
    mutationFn: async ({
      playlistId,
      data,
    }: {
      playlistId: string;
      data: UpdatePlaylistTrackRequest;
    }) => await updatePlaylistTrack({ playlistId, data }),

    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: playlistsQueryKeys.playlists(id),
      });
      queryClient.invalidateQueries({
        queryKey: playlistsQueryKeys.playlist(data.data.playlistId),
      });
    },

    onError: () => {
      toast.error("해당 곡을 플레이리스트에 추가하지 못했습니다.");
    },
  });

  const handleAddTrack = (playlistId: string, playlistName: string) => {
    if (!data) return;

    playlistId === currentPlaylistId && addPlayListTrack(data.playlist.track);

    updatePlaylist({
      playlistId,
      data: { isAdd: data.playlist.isAdd, trackId: data.playlist.trackId },
    });

    TrackToast({
      targetName: `플레이리스트 - [${playlistName}]`,
      isAdd: data.playlist.isAdd,
      track: data.playlist.track,
    });

    setTimeout(() => onClose(), 300);
  };

  const { mutate: getTrack } = useMutation({
    mutationFn: async ({ playlistId }: { playlistId: string }) =>
      await getTracksByPlaylist(playlistId),

    onSuccess: data => {
      if (data.tracks.length < 1) return;

      queryClient.setQueryData<Track[]>(
        playlistsQueryKeys.playlistTracks(data.playlistId),
        data.tracks,
      );
      !displayPlayer && onPlayerOpen();
      handlePlayListClick("LIST", { id: data.playlistId, tracks: data.tracks });
      onClose();
    },

    onError: () => {
      console.log("FAILED GET TRACKS");
    },
  });

  const handleSetPlaylist = (playlistId: string) => {
    const prevData = queryClient.getQueryData(
      playlistsQueryKeys.playlistTracks(playlistId),
    ) as Track[];

    if (!!prevData && prevData.length < 1) return;

    if (prevData) {
      !displayPlayer && onPlayerOpen();
      handlePlayListClick("LIST", {
        id: playlistId,
        tracks: prevData,
      });
      setTimeout(() => onClose(), 300);
    } else {
      getTrack({ playlistId });
    }
  };

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
        playlistsData?.pages?.map((group, i) => (
          // @ts-ignore
          <Fragment key={i}>
            {group.playlists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                size="sm"
                data={playlist}
                onClick={!!data ? handleAddTrack : handleSetPlaylist}
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
      variant="outline"
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
      isOpen={isOpen}
      onClose={onClose}
      // disabled={isLoading}
      containerClassName="w-full sm:w-[420px] h-full"
      mode="slide"
    />
  );
};

export default PlaylistModal;
