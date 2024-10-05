import React, { useEffect, useRef } from "react";
import {
  PanInfo,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateQueue } from "@/api/queue";
import { _PATCH } from "@/api/rootAPI";
import {
  playlistsQueryKeys,
  updatePlaylistTrack,
  UpdatePlaylistTrackRequest,
} from "@/api/playlist";

import { Track } from "@/types";
import { TRACK_CARD_HEIGHT } from "@/constants/uiSizes";

import { usePlayerControl } from "@/stores/usePlayerControl";
import { useQueue } from "@/stores/useQueue";

import Image from "../Image";

import {
  ArtWrapper,
  TrackDeleteButton,
  TrackMotion,
  TrackWrapper,
} from "./TrackCard.styles";
import { TrackToast } from "../Toastify";
import { Trash } from "../icons";

interface TrackCardProps {
  data: Track;
  trackListId?: string;
  trackListType: "ALBUM" | "LIST" | "QUEUE";
  focused?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const TrackCard = ({
  data,
  trackListId,
  trackListType,
  focused = false,
  onClick = () => null,
  ...rest
}: TrackCardProps) => {
  const { style } = rest;

  const addPlayListTrack = usePlayerControl(state => state.addTrack);
  const deletePlayListTrack = usePlayerControl(state => state.deleteTrack);
  const originTrackListId = usePlayerControl(state => state.originTrackListId);

  const addQueueList = useQueue(state => state.addTrack);
  const deleteQueueList = useQueue(state => state.deleteTrack);

  const qeueuMutation = useMutation({
    mutationFn: updateQueue,
  });

  const queryClient = useQueryClient();
  const { mutate: playlistMutation } = useMutation({
    mutationFn: async ({
      playlistId,
      data,
    }: {
      playlistId: string;
      data: UpdatePlaylistTrackRequest;
    }) => await updatePlaylistTrack({ playlistId, data }),

    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: playlistsQueryKeys.playlist(data.data.playlistId),
      });
    },

    onError: () => {
      toast.error("해당 곡을 플레이리스트에 추가하지 못했습니다.");
    },
  });

  const [scope, animate] = useAnimate();
  const x = useMotionValue(0);
  const btnOpacity = useTransform(x, [-80, -15], [1, 0]);

  const dragStarted = useRef(false);
  const deleteActive = useRef(false);

  function handleDragStart() {
    dragStarted.current = true;
  }

  useEffect(() => {
    x.set(0);
  }, []);

  function handleOnDrag(_: any, info: PanInfo) {
    const delta = info.delta;

    // to left - Delete Action
    if (delta.x < 0) {
      // when ALBUM, blocking go to left
      if (trackListType === "ALBUM") {
        x.set(0);
        return;
      }

      x.set(Math.max(x.get() + delta.x, -80));
    }

    // to right - Add Action
    if (delta.x >= 0) {
      if (trackListType === "QUEUE") {
        x.set(Math.min(x.get() + delta.x, 0));
        return;
      }

      x.set(Math.min(x.get() + delta.x, 100));
    }
  }

  function handleOnDragEnd(_: any, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // DELETE MOTION
    if (trackListType !== "ALBUM") {
      if (offset < -100 || velocity < -500) {
        // task queue 후순위로 동작하도록 하기 위해
        setTimeout(() => (deleteActive.current = true), 1);
        animate(x, -80, { duration: 0.5 });
      } else {
        setTimeout(() => (deleteActive.current = false), 1);
        animate(x, 0, { duration: 0.5 });
      }
    }

    // ADD TO QUEUE
    if (trackListType !== "QUEUE") {
      // TODO: 모바일환경에서는 너무 예민함
      if (offset > 100 || velocity > 500) {
        if (deleteActive.current) return;

        animate(scope.current, { x: 0 }, { duration: 0.5 });
        setTimeout(() => {
          addPlayListTrack(data);
          addQueueList(data);
          qeueuMutation.mutate({ isAdd: true, trackId: data.id });
        }, 200);
      }
    }

    dragStarted.current = false;
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!dragStarted.current) onClick();
  }

  function handleDeleteBtn() {
    if (trackListType === "QUEUE") {
      deletePlayListTrack(data);
      deleteQueueList(data);
      qeueuMutation.mutate({ isAdd: false, trackId: data.id });
    }

    if (trackListType === "LIST" && !!trackListId) {
      playlistMutation({
        data: { isAdd: false, trackId: data.id },
        playlistId: trackListId,
      });
      trackListId === originTrackListId && deletePlayListTrack(data);

      TrackToast({
        targetName: `플레이리스트`,
        isAdd: false,
        track: data,
      });
    }
  }

  return (
    <TrackWrapper
      style={{ ...style }}
      whileTap={{ cursor: "grabbing" }}
      // layout
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
    >
      <TrackMotion
        onClick={handleClick}
        $focused={focused}
        drag="x"
        dragDirectionLock
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleOnDragEnd}
        style={{ x }}
        // dragElastic={0}
        dragMomentum={false}
        dragPropagation={false}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        ref={scope}
      >
        <ArtWrapper>
          <Image
            imageUrl={data.albumArtURL}
            alt="album image"
            draggable={false}
            width={TRACK_CARD_HEIGHT - 8} // 8
            className="object-cover"
          />
        </ArtWrapper>
        <section className="flex flex-col">
          <span className="font-semibold text-base line-clamp-1">
            {data.trackTitle}
          </span>
          <span className="font-medium text-xs line-clamp-1">
            {data.artistName}
          </span>
        </section>
      </TrackMotion>
      {trackListType !== "ALBUM" ? (
        <TrackDeleteButton
          style={{ opacity: btnOpacity }}
          onClick={handleDeleteBtn}
        >
          <span className="text-white">
            <Trash />
          </span>
        </TrackDeleteButton>
      ) : null}
    </TrackWrapper>
  );
};

export default TrackCard;
