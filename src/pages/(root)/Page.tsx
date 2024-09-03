import { Button } from "@/components";
import SymbolHeader from "@/components/SymbolHeader";
import { useModal } from "@/stores/useModalStore";
import { useNavigate } from "react-router";

const RootPage = () => {
  const navigate = useNavigate();
  const onOpen = useModal(state => state.onOpen);

  return (
    <main className="flex flex-col flex-1 h-full w-full sm:w-[420px] mx-auto px-4 sm:px-0 justify-center items-center pb-16">
      <section className="__TITLES__ flex-1 flex flex-col justify-end items-center">
        <SymbolHeader />
      </section>

      <section className="__BUTTON_GROUP__ flex-1 flex flex-col w-[90%] gap-y-4 justify-center pt-20">
        <Button variant="flat" size="lg" onClick={() => onOpen("login")}>
          <span>PLAYCE 시작하기</span>
        </Button>
        <Button variant="link" size="sm" onClick={() => navigate("/home")} className="text-neutral-400 hover:text-primary mt-4">
          <span>PLAYCE 둘러보기</span>
        </Button>
      </section>
    </main>
  );
};

export default RootPage;
