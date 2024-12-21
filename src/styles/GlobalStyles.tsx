import styled, { createGlobalStyle, css } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

import { NAV_HEIGHT, PLAYER_HEADER_HEIGHT } from "@/constants/uiSizes";

const Styles = css`
  html {
    font-family: "Noto Sans Korean", "Helvetica Neue", sans-serif;
    font-display: swap;
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

  ${tw`flex flex-col max-h-full`}
`;

export default GlobalStyles;
