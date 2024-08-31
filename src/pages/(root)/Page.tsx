import { Button } from "@/components";
import { useModal } from "@/stores/useModalStore";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const RootPage = () => {
  const navigate = useNavigate();
  const onOpen = useModal(state => state.onOpen);

  return (
    <main className="flex flex-col h-full w-full sm:w-[420px] mx-auto px-4 sm:px-0 justify-center items-center pb-16">
      <section className="__TITLES__ flex-1 flex flex-col justify-end items-center">
        <Symbol>PLAYCE</Symbol>
        <ServiceDescription>Connect your real albums</ServiceDescription>
      </section>

      <section className="__BUTTON_GROUP__ flex-1 flex flex-col w-full gap-y-4 justify-center">
        <Button variant="flat" size="lg" onClick={() => onOpen("login")}>
          <span>Log In</span>
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate("/join")}>
          <span>Join us</span>
        </Button>
      </section>
    </main>
  );
};

export default RootPage;

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
