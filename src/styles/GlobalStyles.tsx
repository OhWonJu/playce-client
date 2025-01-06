import styled, { createGlobalStyle, css } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

import "./pretendard.css";

import { NAV_HEIGHT, PLAYER_HEADER_HEIGHT } from "@/constants/uiSizes";

const Styles = css`
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    -webkit-text-size-adjust: none; /*Chrome, Safari, newer versions of Opera*/
    -moz-text-size-adjust: none; /*Firefox*/
    -ms-text-size-adjust: none; /*Ie*/
    -o-text-size-adjust: none; /*old versions of Opera*/
  }

  body {
    position: relative;
    box-sizing: border-box;
    touch-action: manipulation;
    overscroll-behavior-x: none;
    background-color: var(--background);
    color: var(--primary);
    user-select: none;
    font-weight: 500;
  }
`;

const CustomStyles = createGlobalStyle<any>`
    ${Styles}
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export const PlayableContainer = styled.main`
  padding-top: ${NAV_HEIGHT * 2}px;
  padding-bottom: ${NAV_HEIGHT * 2 + PLAYER_HEADER_HEIGHT}px;

  ${tw`flex flex-col`}
`;

export default GlobalStyles;
