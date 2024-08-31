import { createGlobalStyle } from "styled-components";
import { GlobalStyles as BaseStyles } from "twin.macro";

const Custom = createGlobalStyle<any>`
  body {
    position: relative;
    
    margin: 0;
    
    min-width: 420px;
    height: 100vh;
    min-height: 100vh;
    
    box-sizing: border-box;
    touch-action: manipulation;
    
    font-family: "Noto Sans KR", sans-serif;
    font-display: swap;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overscroll-behavior-x: none;
    
    user-select: none;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Custom />
  </>
);

export default GlobalStyles;
