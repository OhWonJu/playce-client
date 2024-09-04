import styled from "styled-components";
import tw from "twin.macro";

export const AlbumArtWrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 250px;
  min-width: 250px;
  aspect-ratio: 1/1;
  overflow: hidden;

  ${tw`rounded-md shadow-sm mb-2 sm:mb-0`}
`;

export const AlbumOverlay = styled.span`
  position: relative;
  width: 100%;
  height: 100%;

  ${tw`hidden group-hover:block group-hover:bg-gradient-to-b from-black`}
`;
