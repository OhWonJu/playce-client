import styled from "styled-components";
import tw from "twin.macro";

export const AlbumInfoWrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;

  ${tw`flex-col mb-4`}
  ${tw`sm:flex-row sm:h-[250px] sm:space-x-6`}
  ${tw`lg:flex-col lg:h-auto lg:space-x-0`}
  ${tw`xl:flex-row xl:h-[250px] xl:space-x-6`}
`;

export const AlbumUtilsWrapper = styled.section`
  ${tw`grid grid-rows-4`}
  ${tw`mt-4 sm:mt-0 lg:mt-4 xl:mt-0`}
`;
