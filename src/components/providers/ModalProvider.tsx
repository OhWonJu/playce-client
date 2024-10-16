import { lazy, Suspense } from "react";
import { useModal } from "@/stores/useModalStore";

import { LoginModal } from "../modals/modalViews";

const PlaylistModal = lazy(
  () => import("@/components/modals/modalViews/PlaylistModal"),
);
const CreatePlaylistModal = lazy(
  () => import("@/components/modals/modalViews/CreatePlaylistModal"),
);
const CartModal = lazy(
  () => import("@/components/modals/modalViews/CartModal"),
);
const DeleteUserModal = lazy(
  () => import("@/components/modals/modalViews/DeleteUserModal"),
);

const ModalProvider = () => {
  const type = useModal(state => state.type);

  return (
    <Suspense>
      {type === "login" && <LoginModal />}
      {type === "playlist" && <PlaylistModal />}
      {type === "createPlaylist" && <CreatePlaylistModal />}
      {type === "cart" && <CartModal />}
      {type === "deleteUser" && <DeleteUserModal />}
    </Suspense>
  );
};

export default ModalProvider;
