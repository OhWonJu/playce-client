import { SYMBOL_TITLE } from "@/constants";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

interface SymbolHeaderProps {
  title?: string;
  description?: string;
}

const SymbolHeader = ({
  title = SYMBOL_TITLE,
  description = "Connect your pysical albums",
}: SymbolHeaderProps) => {
  return (
    <>
      <Symbol data-test="symbol-header">{title}</Symbol>
      <ServiceDescription data-test="symbol-description">{description}</ServiceDescription>
    </>
  );
};

export default SymbolHeader;

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px)
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Symbol = styled.h1`
  opacity: 0;
  animation: ${animation} 1000ms ease-out 1;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
  ${tw`font-extrabold text-7xl mb-3`};
`;

const ServiceDescription = styled.h2`
  opacity: 0;
  animation: ${animation} 800ms ease-out 1;
  animation-delay: 800ms;
  animation-fill-mode: forwards;
  ${tw`font-semibold`}
`;
