import React, { useEffect, useRef } from "react";
import {
  PanInfo,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useMutation } from "@tanstack/react-query";

import { updateQueue, UpdateQueueRequest } from "@/api/queue";
import { _PATCH } from "@/api/rootAPI";

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

interface TrackCardProps {
  data: Track;
  trackListType: "ALBUM" | "LIST" | "QUEUE";
  focused?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const TrackCard = ({
  data,
  trackListType,
  focused = false,
  onClick = () => null,
  ...rest
}: TrackCardProps) => {
  const { style } = rest;

  const addPlayListTrack = usePlayerControl(state => state.addTrack);
  const delePlayListTrack = usePlayerControl(state => state.deleteTrack);

  const addQueueList = useQueue(state => state.addTrack);
  const deleteQueueList = useQueue(state => state.deleteTrack);

  const mutation = useMutation({
    mutationFn: updateQueue,
  });

  const [scope, animate] = useAnimate();
  const x = useMotionValue(0);
  const btnOpacity = useTransform(x, [-80, -15], [1, 0]);

  const dragStarted = useRef(false);

  function handleDragStart() {
    dragStarted.current = true;
  }

  useEffect(() => {
    x.set(0);
  }, []);

  function handleOnDrag(event: any, info: PanInfo) {
    const delta = info.delta;

    // left - Delete Action
    if (delta.x < 0) {
      if (trackListType !== "ALBUM") {
        x.set(Math.max(x.get() + delta.x, -80));
      } else {
        // when ALBUM, blocking go to left
        x.set(0);
      }
    }

    // right - Add Action
    if (delta.x > 0) {
      if (trackListType !== "QUEUE") x.set(Math.min(x.get() + delta.x, 100));
      else x.set(Math.min(x.get() + delta.x, 0));
    }
  }

  function handleOnDragEnd(event: any, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // DELETE MOTION
    if (trackListType !== "ALBUM") {
      if (offset < -100 || velocity < -500) {
        animate(x, -80, { duration: 0.5 });
      } else {
        animate(x, 0, { duration: 0.5 });
      }
    }

    // ADD TO QUEUE
    if (trackListType !== "QUEUE") {
      if (offset > 100 || velocity > 500) {
        animate(scope.current, { x: 0 }, { duration: 0.5 });
        setTimeout(() => {
          addPlayListTrack(data);
          addQueueList(data);
          mutation.mutate({ isAdd: true, trackId: data.id });
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
      delePlayListTrack(data);
      deleteQueueList(data);
      mutation.mutate({ isAdd: true, trackId: data.id });
    }
    if (trackListType === "LIST") null;
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
          <span className="text-white font-bold">Delete</span>
        </TrackDeleteButton>
      ) : null}
    </TrackWrapper>
  );
};

export default TrackCard;
