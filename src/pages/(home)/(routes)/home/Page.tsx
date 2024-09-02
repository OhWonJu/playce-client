import { MutationResponse } from "@/api/axios/axiosInstance.types";
import { logOutMutate } from "@/api/users";
import { _POST } from "@/api/rootAPI";

import { Button } from "@/components";
import { useAuthStore } from "@/stores/useAuthStore";
import useMeStore from "@/stores/useMeStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { setIsLogin } = useAuthStore();
  const { nickName } = useMeStore();
  const navigate = useNavigate();

  const refresh = async () => {
    const res = await _POST<MutationResponse>("/auth/refresh");
    console.log(res);
    return;
  };

  const { mutate } = useMutation({
    mutationFn: logOutMutate,
    onSuccess: () => {
      setIsLogin(false);
      navigate("/");
    },
    onError: data => console.log(data),
  });

  return (
    <div className="flex flex-col w-[420px] mx-auto">
      Wellcome {nickName}
      <Button onClick={refresh}>Refresh</Button>
      <Button onClick={() => navigate("/my/playlists")}>gogo</Button>
      <Button onClick={mutate}>logout</Button>
    </div>
  );
};

export default HomePage;
