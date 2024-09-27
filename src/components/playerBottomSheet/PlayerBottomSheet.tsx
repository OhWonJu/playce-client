import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { animate, useMotionValue, motion, useTransform } from "framer-motion";

import { NAV_HEIGHT } from "@/constants/uiSizes";

import SubSheetProgressStore from "@/stores/subSheetProgress";
import MainSheetProgressStore from "@/stores/mainSheetProgress";

import { Content, Lyrics, TrackList } from "./modules";

import Sheet, { SheetRef } from "../BottomSheet";
import { DEFAULT_TWEEN_CONFIG } from "../BottomSheet/constants";

import {
  PBSContentWrapper,
  PBSHandle,
  PBSHandleWrapper,
  PBSHeaderWrapper,
} from "./playerBottomSheet.styles";

const Tab = lazy(() => import("@/components/Tab/Tab"));
const TabSection = lazy(() => import("@/components/Tab/TabSection"));

const HEADER_BAR_HEIGHT = 20;
const HEADER_FIXED_HEIGHT = NAV_HEIGHT + HEADER_BAR_HEIGHT - 1.5;

const TAB_NAMES = ["Tracks", "Lyrics", "Content"];

const PlayerBottomSheet = () => {
  const [focusedTab, setFocusedTab] = useState(-1);
  const prevFocusedTab = useRef(focusedTab);

  const tabViews = [<TrackList />, <Lyrics />, <Content />];

  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  const { progress } = SubSheetProgressStore();
  const { progress: mainProgress } = MainSheetProgressStore();
  const motionProg = useMotionValue(0);
  const mainMotionProg = useMotionValue(0);

  // useEffect(() => {
  //   if (mainProgress <= 0) {
  //     // 메인시트가 close 되는 경우
  //     animate(mainMotionProg, 0, {
  //       type: "tween",
  //       ...DEFAULT_TWEEN_CONFIG,
  //     });
  //   } else {
  //     // 메인 플레이어가 열리는 경우
  //     animate(mainMotionProg, mainProgress, {
  //       type: "spring",
  //       ...DEFAULT_SPRING_CONFIG,
  //     });
  //   }
  // }, [mainProgress]);

  useEffect(() => {
    if (mainProgress <= 0) {
      // 메인시트가 close 되는 경우
      animate(
        mainMotionProg,
        0,
        ref.current.animationOptions as { type: "tween" },
      );
    } else {
      // 메인 시트가 open 되는 경우
      animate(
        mainMotionProg,
        mainProgress,
        ref.current.animationOptions as { type: "tween" },
      );
    }
  }, [mainProgress]);

  useEffect(() => {
    if (progress <= 0) {
      // 바텀시트가 close 되는 경우
      animate(motionProg, 0, {
        type: "tween",
        ...DEFAULT_TWEEN_CONFIG,
      } as { type: "tween" });
    } else {
      // 바텀시트가 open 되는 경우
      animate(motionProg, progress, {
        type: "tween",
        ...DEFAULT_TWEEN_CONFIG,
      } as { type: "tween" });
      // 탭을 기본탭으로 이동시킨다.
      if (focusedTab === -1) setFocusedTab(0);
    }
    // 메인시트가 fully open 이 되면 -> 서브 시트의 탭 초기화
    if (mainProgress > 99) setFocusedTab(-1);
  }, [progress]);

  const y =
    progress <= 0
      ? useTransform(mainMotionProg, [85, 100], [HEADER_FIXED_HEIGHT, 0])
      : useTransform(
          motionProg,
          [50, 100],
          [0, HEADER_FIXED_HEIGHT], // [ OPEN , CLOSE ]
        );

  const trigger = useTransform(motionProg, [0, 100], [0, 1]); // 0: to OPEN | 1: to CLOSE

  const tabClickHandler = (index: number) => {
    // 탭 클릭시 바텀시트 완전 오픈
    if (trigger.get() === 0) {
      // triggerHandler();
      snapTo(0);
    }
    prevFocusedTab.current = focusedTab;
    setFocusedTab(index);
  };

  return (
    <>
      <Sheet
        ref={ref}
        id="player-bottom-sheet"
        rootId="root-layout"
        mountPoint={document.getElementById("root-layout")}
        isMain={false}
        isOpen={true}
        modalMode={false}
        onClose={() => null}
        fixedHeight={HEADER_FIXED_HEIGHT}
        // initialSnap={1}
        snapPoints={[1, HEADER_FIXED_HEIGHT]} // sheet content + sheet header's heigth - tab border bottom
      >
        <motion.div
          id="player-bottom-sheet"
          style={{
            height: "100%",
            maxHeight: "100%",
            y,
          }}
        >
          <Sheet.Container
            isMain={false}
            style={{ height: "100%", maxHeight: "100%" }}
            className="rounded-2xl shadow-top"
          >
            <Sheet.Header
              isMain={false}
              style={{
                width: "100%",
                height: NAV_HEIGHT + HEADER_BAR_HEIGHT,
                minHeight: NAV_HEIGHT + HEADER_BAR_HEIGHT,
              }}
            >
              <PBSHandleWrapper
                className="relative grid place-items-center"
                style={{ width: "100%", height: HEADER_BAR_HEIGHT }}
                onClick={() => snapTo(0)}
              >
                <PBSHandle />
              </PBSHandleWrapper>
              <PBSHeaderWrapper>
                <Suspense>
                  <Tab
                    focusedTab={focusedTab}
                    tabClickHandler={tabClickHandler}
                    tabContents={TAB_NAMES}
                  />
                </Suspense>
              </PBSHeaderWrapper>
            </Sheet.Header>
            <Sheet.Content isMain={false} disableDrag={true}>
              <PBSContentWrapper>
                <Suspense>
                  <TabSection
                    focusedTab={focusedTab}
                    prevFocusedTab={prevFocusedTab.current}
                    tabViews={tabViews}
                  />
                </Suspense>
              </PBSContentWrapper>
            </Sheet.Content>
          </Sheet.Container>
        </motion.div>
      </Sheet>
    </>
  );
};

export default PlayerBottomSheet;
