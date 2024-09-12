import React, { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createNewPlaylist,
  CreatePlaylistRequest,
  playlistsQueryKeys,
} from "@/api/playlist";

import { useModal } from "@/stores/useModalStore";
import useMeStore from "@/stores/useMeStore";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/buttons/Button";

import ModalLayout from "../ModalLayout";
import InputModeStore from "@/stores/inputModeSotre";

const formSchema = z.object({
  playListName: z.string().min(1).max(11),
  isPublic: z.boolean(),
});

const CreatePlaylistModal = () => {
  const { id } = useMeStore();
  const { onOpen, onClose, data } = useModal();
  const { setInputMode } = InputModeStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playListName: "",
      isPublic: true,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: CreatePlaylistRequest) =>
      await createNewPlaylist(data),
    onSuccess: () => {
      console.log("SUCCESS");
      form.reset();
      queryClient.invalidateQueries({
        queryKey: playlistsQueryKeys.playlists(id),
      });
      onClose();
      if (data.createPlayListData.fromPlaylist) {
        onOpen("playlist");
      }
    },
    onError: () => {
      console.log("FAILED");
      form.reset();
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  useEffect(() => {
    setInputMode(true);

    return () => {
      setInputMode(false);
    };
  }, []);

  const bodyContent = (
    <div className=" w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="playListName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row justify-between text-base text-primary">
                  플레이리스트 이름
                  <FormMessage className="text-xs" />
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder=""
                    {...field}
                    className="bg-neutral-300/50 border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );

  const footerContent = (
    <div className="flex w-full justify-end space-x-2">
      <Button variant="outline" useRipple onClick={onClose}>
        <span className="pt-[2px] text-center content-center">취소</span>
      </Button>
      <Button
        variant="outline"
        onClick={form.handleSubmit(onSubmit)}
        disabled={isLoading}
        useRipple
      >
        <span className="pt-[2px] text-center content-center">만들기</span>
      </Button>
    </div>
  );

  return (
    <ModalLayout
      title={"새 플레이리스트"}
      body={bodyContent}
      footer={footerContent}
      onClose={onClose}
      // disabled={isLoading}
      containerClassName="w-[90%] sm:w-[420px] "
    />
  );
};

export default CreatePlaylistModal;
