import { createGlobalStyle, css } from "styled-components";
import { GlobalStyles as BaseStyles } from "twin.macro";

const Styles = css`
  html {
    font-family: "Noto Sans KR", sans-serif;
    font-display: swap;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

export default GlobalStyles;
