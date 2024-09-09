import React from "react";

import { MusicCard, MusicList } from "@/components";
import { GetSummaryResponse } from "@/api/users";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/stores/usePlayerControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTracksByPlaylist, playlistsQueryKeys } from "@/api/playlist";
import { Track } from "@/types";
import { useModal } from "@/stores/useModalStore";

interface MyPlayListSectionProps {
  myPlayList: GetSummaryResponse["myPlayList"];
}

const MyPlayListSection = ({ myPlayList }: MyPlayListSectionProps) => {
  const { displayPlayer, onOpen: onPlayerOpen } = usePlayerToggle();
  const handlePlayListClick = usePlayerControl(
    state => state.handlePlayListClick,
  );
  const openModal = useModal(state => state.onOpen);

  const queryClient = useQueryClient();
  const { mutate: getTrack } = useMutation({
    mutationFn: async ({ playlistId }: { playlistId: string }) =>
      await getTracksByPlaylist(playlistId),
    onSuccess: data => {
      queryClient.setQueryData<Track[]>(
        playlistsQueryKeys.playlistTracks(data.playlistId),
        data.tracks,
      );
      !displayPlayer && onPlayerOpen();
      handlePlayListClick("LIST", { id: data.playlistId, tracks: data.tracks });
    },
    onError: () => {
      console.log("FAILED GET TRACKS");
    },
  });

  const myPlaylistsRenderer = () =>
    myPlayList.map(playlist => (
      <MusicCard
        key={playlist.id}
        title={playlist.playListName}
        imageUrl={
          playlist.thumbNail.length < 4
            ? playlist.thumbNail[0]
            : playlist.thumbNail
        }
        playable
        playAction={() => {
          const prevData = queryClient.getQueryData(
            playlistsQueryKeys.playlistTracks(playlist.id),
          );

          if (prevData) {
            !displayPlayer && onPlayerOpen();
            handlePlayListClick("LIST", {
              id: playlist.id,
              tracks: prevData as Track[],
            });
          } else getTrack({ playlistId: playlist.id });
        }}
      />
    ));

  return (
    <MusicList
      title="나의 플레이리스트"
      renderer={myPlaylistsRenderer}
      exceptionGuide={`플레이리스트가 없어요. 새로운 플레이리스트를 만들어 볼까요?`}
      exceptionAction={() => openModal("createPlaylist")}
      hasMoreAction={() => openModal("playlist")}
    />
  );
};

export default MyPlayListSection;
