import React, { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

import MainSheetProgressStore from "@/stores/mainSheetProgress";
import SubSheetProgressStore from "@/stores/subSheetProgress";
import { usePlayerControl } from "@/stores/usePlayerControl";

import Sheet, { SheetRef } from "../BottomSheet";
import {
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
  PLAYER_MOBILE_Z,
  WAVE_FORM_HEIGHT,
} from "@/constants/uiSizes";
import {
  Album,
  AlbumArea,
  PlayerBody,
  PlayerCtlrArea,
  PlayerHeader,
  PlayerMicroCtlr,
} from "./player.styles";
import { DotMenu } from "../icons";
import {
  AlbumArt,
  ForwardButton,
  PlayButton,
  PlayerMarquee,
  PlayTimer,
  RepeatButton,
  ShuffleButton,
  Waveform,
} from "./_modules";

const PlayerMobileView = () => {
  const currentTrack = usePlayerControl(state => state.currentTrack);

  const ref = useRef<SheetRef>();
  // const snapTo = (i: number) => ref.current?.snapTo(i);

  const { progress } = MainSheetProgressStore();
  const { progress: subProgress, setProgress: setSubProgress } =
    SubSheetProgressStore();

  const motionProg = useMotionValue(0);

  // init SubProgress When Components mounted, unmounted
  // desktop <-> mobile 모드 전환시 subProgress 가 100으로 남아있는 경우
  // player sheet 에 대한 드레그를 할 수 없는 상태가 발생함
  useEffect(() => {
    setSubProgress(0);

    return () => {
      setSubProgress(0);
    };
  }, []);

  // should i need this ? //
  // 브라우저 높이가 바뀔 때 플레이어가 열려 있는 경우 UI 가 깨지는 것을 플레이어를 닫음으로써 해결하는 케이스
  // useEffect(() => {
  //   if (progress > 0) setProgress(0);
  //   if (subProgress > 0) setSubProgress(0);
  // }, [height]);

  useEffect(() => {
    // 애니메이션된 값 motionProg 를 닫히는 정도 값으로 사용
    // 메인 시트의 progress 가 0 이 되면  N -> 0 으로 값이 tween 형식으로 점진적으로 줄어들게 함
    if (progress <= 0) {
      animate(motionProg, 0, ref.current.animationOptions as { type: "tween" });
    } else {
      // 그 외의 경우 prgress 값 만큼으로 특정 시간만큼 점진적으로 변경
      animate(
        motionProg,
        progress,
        ref.current.animationOptions as { type: "tween" },
      );
    }
  }, [progress]);

  const gap = useTransform(motionProg, [0, 100], ["0rem", "0.5rem"]);

  const headerOpacity = useTransform(motionProg, [85, 95], [0, 1]);
  const headerHeight = useTransform(motionProg, [10, 70], ["0%", "8%"]);

  const albumHeight = useTransform(
    motionProg,
    [0, 100],
    [PLAYER_HEADER_HEIGHT, 100],
  );
  const albumPadding = useTransform(motionProg, [0, 100], ["0.25rem", "0rem"]);

  const microCtrlOpacity = useTransform(motionProg, [0, 30], [1, 0]);
  const microCtrlWidth = useTransform(motionProg, [0, 99], ["100%", "0%"]);
  const microCtrlPadding = useTransform(
    motionProg,
    [0, 99],
    ["0.25rem", "0rem"],
  );

  const pinOpacity = useTransform(motionProg, [99, 100], [0, 1]);

  return (
    <>
      <Sheet
        ref={ref}
        id="player"
        rootId="root-layout"
        mountPoint={document.getElementById("root-layout")}
        isMain={true}
        isOpen={true}
        modalMode={false}
        onClose={() => null}
        // fixedHeight={
        //   viewMode !== "DESKTOP"
        //     ? NAV_HEIGHT + PLAYER_HEADER_HEIGHT
        //     : PLAYER_HEADER_HEIGHT // PLAYER_HEADER_HEIGHT + 34
        // }
        fixedHeight={NAV_HEIGHT + PLAYER_HEADER_HEIGHT}
        // snapPoints={[
        //   viewMode !== "DESKTOP" ? 1 : height - NAV_HEIGHT,
        //   viewMode !== "DESKTOP"
        //     ? NAV_HEIGHT + PLAYER_HEADER_HEIGHT
        //     : PLAYER_HEADER_HEIGHT,
        // ]}
        snapPoints={[1, NAV_HEIGHT + PLAYER_HEADER_HEIGHT]}
        disableDrag={subProgress > 99 ? true : false}
        // onSnap={snapIndex =>
        //   console.log("> Current snap point index:", snapIndex)
        // }
        style={{ zIndex: PLAYER_MOBILE_Z }}
      >
        <Sheet.Container isMain={true} className="shadow-top border-t border-neutral-200/50 dark:border-neutral-700">
          <Sheet.Content isMain={true} style={{ maxHeight: "90%" }}>
            <div
              id="player-container"
              className="flex flex-col w-full h-[100%] max-h-screen px-2"
            >
              {/* HEADER */}
              <PlayerHeader
                style={{
                  height: headerHeight,
                  opacity: headerOpacity,
                  marginBottom: gap,
                }}
              >
                <div className="flex justify-center items-center h-full aspect-square rounded-full">
                  <DotMenu className="w-5 h-5" />
                </div>
              </PlayerHeader>
              {/* BODY */}
              <PlayerBody id="player-body">
                <AlbumArea>
                  <Album
                    className="aspect-square"
                    style={{
                      height: albumHeight,
                      minHeight: `${progress}%`,
                      padding: albumPadding,
                    }}
                  >
                    <AlbumArt
                      artURL={currentTrack?.albumArtURL}
                      pinOpacity={pinOpacity}
                    />
                  </Album>
                  <PlayerMicroCtlr
                    style={{
                      opacity: microCtrlOpacity,
                      width: microCtrlWidth,
                      padding: microCtrlPadding,
                    }}
                  >
                    <div className="__MICRO_TRACK__ flex flex-col max-w-[80%]">
                      <span className="__MICRO_TRACK_TITLE__ font-extrabold text-sm line-clamp-1">
                        {currentTrack?.trackTitle}
                      </span>
                      <span className="__MICRO_ARTIST__ font-semibold text-xs line-clamp-1">
                        {currentTrack?.artistName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <PlayButton className="w-[48px] h-[48px] p-[13px]" />
                      <ForwardButton className="w-[48px] h-[48px] p-[13px]" isForward={true} />
                    </div>
                  </PlayerMicroCtlr>
                </AlbumArea>
                <PlayerCtlrArea
                  id="player-controll"
                  style={{
                    opacity: headerOpacity,
                    paddingTop: gap,
                    paddingBottom: gap,
                  }}
                  className={`opacity-100 ${
                    headerOpacity.get() < 1 && "opacity-0"
                  } transition-opacity duration-150`}
                >
                  {/* TRACK INFO */}
                  <section className="__TRACK_INFO__ flex flex-col items-center w-full mb-2">
                    <PlayerMarquee title={currentTrack?.trackTitle} />
                    <span className="__ARTIST__ font-bold text-base line-clamp-1">
                      {currentTrack?.artistName}
                    </span>
                  </section>
                  {/* WAVE FORM  */}
                  <section
                    className="__WAVE_FORM_CONTAINER__ relative mb-1 w-full overflow-hidden"
                    style={{ height: WAVE_FORM_HEIGHT }}
                  >
                    <div className="absolute w-full h-full bottom-[15.5px]">
                      <Waveform />
                    </div>
                  </section>
                  {/* PLAY TIME INDICATOER */}
                  <section className="flex w-full justify-between font-semibold text-xs mb-7">
                    <PlayTimer />
                  </section>
                  {/* CONTROLLER */}
                  <section className="__CONTROLLER__ flex w-full justify-between items-center ">
                    <ShuffleButton />
                    <ForwardButton isForward={false} />
                    <PlayButton />
                    <ForwardButton isForward={true} />
                    <RepeatButton />
                  </section>
                </PlayerCtlrArea>
              </PlayerBody>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default PlayerMobileView;
