import styled from "styled-components";
import tw from "twin.macro";

export const PlayIndicatorBackGround = styled.div`
  position: relative;
  height: 1.5px;
  width: 100%;
`;

export const PlayIndicatorBar = styled.span<{ $percent?: number }>`
  width: ${props => props.$percent ?? 0}%;
  background-color: var(--primary);

  ${tw`absolute top-0 left-0 bottom-0 rounded-full `}
`;
