import { lazy, Suspense } from "react";
import { useModal } from "@/stores/useModalStore";

const LoginModal = lazy(
  () => import("@/components/modals/modalViews/LoginModal"),
);
const PlaylistModal = lazy(
  () => import("@/components/modals/modalViews/PlaylistModal"),
);
const CreatePlaylistModal = lazy(
  () => import("@/components/modals/modalViews/CreatePlaylistModal"),
);
const CartModal = lazy(
  () => import("@/components/modals/modalViews/CartModal"),
);

const ModalProvider = () => {
  const type = useModal(state => state.type);

  return (
    <Suspense>
      {type === "login" && <LoginModal />}
      {type === "playlist" && <PlaylistModal />}
      {type === "createPlaylist" && <CreatePlaylistModal />}
      {type === "cart" && <CartModal />}
    </Suspense>
  );
};

export default ModalProvider;
