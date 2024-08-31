import { css } from "styled-components";

import NotoSansKR from "@/fonts/NotoSansKR-VariableFont_wght.woff";

export const fonts = css`
  @font-face {
    font-family: "Noto Sans KR";
    src: local("NotoSansKR"), url(${NotoSansKR}) format("woff");
  }
`;
