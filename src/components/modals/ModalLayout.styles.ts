import styled from "styled-components";
import tw from "twin.macro";

export const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  inset: 0px;

  z-index: var(--modal);

  ${tw`outline-none focus:outline-none bg-neutral-800/10 backdrop-blur-sm`}
`;

export const ModalCotainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  min-width: 300px;
  min-height: 300px;

  background-color: var(--background);
  border-width: 1px;

  overflow: hidden;

  ${tw`rounded-lg shadow-md`}
`;

export const ModalHeader = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.5rem;
`;

export const ModalContent = styled.section`
  position: relative;
  display: flex;
  flex: 1;

  padding: 1.5rem 2rem;

  overflow-y: scroll;

  ${tw`scrollbar-hide`}
`;

export const ModalFooter = styled.section`
  display: flex;

  padding: 1.5rem;
`;
