import { useModal } from "@/stores/useModalStore";

import { LoginModal } from "@/components/modals/modalViews";

const ModalProvider = () => {
  const type = useModal(state => state.type);

  return (
    <>
      {type === "login" && <LoginModal />}
    </>
  );
};

export default ModalProvider;
