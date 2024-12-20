import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { deleteUserMutate } from "@/api/users";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useModal } from "@/stores/useModalStore";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/buttons/Button";

import ModalLayout from "../ModalLayout";

const formSchema = z.object({
  policy: z.string().min(1).max(11),
});

const DeleteUserModal = () => {
  const [_, setExpiredAt] = useLocalStorage("playce_expired_at");

  const navigate = useNavigate();
  const { isOpen, onClose } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policy: "",
    },
  });

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: async () => await deleteUserMutate(),
    onSuccess: () => {
      setExpiredAt("");
      navigate("/");
      navigate(0);
    },
  });

  const bodyContent = (
    <div className=" w-full">
      <p className="text-xs mb-6">
        PLAYCE 탈퇴 시 해당 계정으로 소유하고 있는 앨범에 대한 온라인 소유권을
        포기하는 것으로 간주됩니다. <br />
        <br />
        PLAYCE 탈퇴 시 해당 계정으로 생성된 모든 정보는 일괄 삭제되며, 복구가
        불가능합니다.
        <br />
        <br />
        이에 동의하시는 경우 "탈퇴 약관 동의"를 입력해주세요.
      </p>
      <div className="space-y-2">
        <Label className="flex flex-row justify-between text-base text-primary">
          PLAYCE 회원 탈퇴 약관 동의
        </Label>
        <Input
          onChange={value => form.setValue("policy", value.target.value)}
          placeholder="탈퇴 약관 동의"
          className="bg-neutral-300/50 border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex w-full justify-end space-x-2">
      <Button variant="outline" useRipple onClick={onClose}>
        <span className="pt-[2px] text-center content-center">취소</span>
      </Button>
      <Button
        variant="outline"
        useRipple
        disabled={form.watch("policy") !== "탈퇴 약관 동의"}
        onClick={deleteUser}
        loading={isPending}
      >
        <span className="pt-[2px] text-center content-center">확인</span>
      </Button>
    </div>
  );

  return (
    <ModalLayout
      title={"PLAYCE 회원 탈퇴"}
      body={bodyContent}
      footer={footerContent}
      isOpen={isOpen}
      onClose={onClose}
      // disabled={isLoading}
      containerClassName="w-[90%] sm:w-[420px] "
    />
  );
};

export default DeleteUserModal;
