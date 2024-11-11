import React from "react";

import { usePlayerControl } from "@/stores/usePlayerControl";

import { PlayList } from "@/components/player/_modules";

const TrackList = () => {
  const { currentTrack } = usePlayerControl();

  return (
    <section className="flex flex-col w-full h-full space-y-1">
      <PlayList currentTrack={currentTrack} />
    </section>
  );
};

export default TrackList;
