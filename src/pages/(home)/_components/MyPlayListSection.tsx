import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { Track } from "@/types";

import { GetSummaryResponse } from "@/api/users";
import { getTracksByPlaylist, playlistsQueryKeys } from "@/api/playlist";


import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/stores/useModalStore";

import { MusicCard, MusicList } from "@/components";

interface MyPlayListSectionProps {
  myPlayList: GetSummaryResponse["myPlayList"];
}

const MyPlayListSection = ({ myPlayList }: MyPlayListSectionProps) => {
  const navigate = useNavigate();
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
      if (!data || data.tracks.length < 1) return;

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
        size="md"
        onClick={() =>
          navigate(
            `/cabinet/playlists/${playlist.playListName}?playlistId=${playlist.id}`,
          )
        }
        useLazy={false}
        playable
        playAction={() => {
          const prevData = queryClient.getQueryData(
            playlistsQueryKeys.playlistTracks(playlist.id),
          ) as Track[];

          if (!!prevData && prevData.length < 1) return;

          if (prevData) {
            !displayPlayer && onPlayerOpen();
            handlePlayListClick("LIST", {
              id: playlist.id,
              tracks: prevData,
            });
          } else {
            getTrack({ playlistId: playlist.id });
          }
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
