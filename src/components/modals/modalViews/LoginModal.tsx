import { useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "@/stores/useModalStore";

import IntersectionLabel from "@/components/IntersectionLabel";

import ModalLayout from "../ModalLayout";
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
import GoogleAuthButton from "@/pages/(root)/_components/GoogleAuthButton";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).+$/),
});

const LoginModal = () => {
  if (window === undefined) {
    console.log("NOT READY");
    return null;
  }

  const navigate = useNavigate();
  const onClose = useModal(state => state.onClose);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      form.reset();
      // onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const bodyContent = (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row justify-between text-base text-primary">
                    Email
                    <FormMessage className="text-xs" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isLoading}
                      disabled
                      placeholder=""
                      {...field}
                      className="bg-neutral-300/50 border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row justify-between text-base text-primary">
                    Password
                    <FormMessage className="text-xs" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isLoading}
                      disabled
                      placeholder=""
                      type="password"
                      {...field}
                      className="bg-neutral-300/50 border-0 focus-visible:ring-1  focus-visible:ring-offset-0 placeholder:text-xs"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="flat"
            type="submit"
            size="lg"
            // disabled={isLoading}
            disabled
            className="w-full"
          >
            로그인
          </Button>
        </form>
      </Form>
      <IntersectionLabel label="PLAYCE 간편 인증하기" className="mt-12" />
      <section className="__SNS_LOGIN__ flex flex-col mt-4 space-y-4">
        <GoogleAuthButton />
      </section>
      <div className="sm:mt-5">
        <Button
          variant="plain"
          className="flex flex-row w-full justify-center mt-4"
          // onClick={() => {
          //   navigate("/join");
          //   onClose();
          // }}
        >
          <span className="text-xs font-semibold font-sansSrif border rounded-md px-1 py-1 border-symbol-blue text-symbol-blue">
            JOIN US!
          </span>
          <span className="ml-3 text-xs font-semibold font-sansSrif text-symbol-blue">
            FOR MORE BENEFIT
          </span>
        </Button>
      </div>
    </div>
  );

  return (
    <ModalLayout
      title="PLAYCE 시작하기"
      body={bodyContent}
      onClose={handleClose}
      disabled={isLoading}
      containerClassName="w-full sm:w-[420px] h-screen"
      mode="slide"
    />
  );
};

export default LoginModal;
