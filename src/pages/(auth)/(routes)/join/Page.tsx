import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { _PUT } from "@/api/rootAPI";
import { ERROR_CODE, ErrorCode } from "@/api/errorCode";
import { userCreateConfirm, UserCreateConfirmRequest } from "@/api/users";

import { useModal } from "@/stores/useModalStore";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, IntersectionLabel } from "@/components";
import SymbolHeader from "@/components/SymbolHeader";

import PolicyListSection from "../../_components/PolicyListSection";

const formSchema = z
  .object({
    nickName: z
      .string()
      .min(2, { message: "닉네임은 최소 2자 이상이어야 합니다." })
      .max(11, { message: "닉네임은 최대 11자 이하이어야 합니다." })
      .regex(/^(?=.*[a-zA-Z가-힣])(?=.*[a-zA-Z가-힣0-9])[a-zA-Z가-힣0-9]*$/, {
        message: "닉네임은 영문, 한글, 숫자 조합이어야 합니다.",
      }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(11, { message: "비밀번호는 최대 11자 이하이어야 합니다." })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).+$/, {
        message: "비밀번호는 숫자, 영문 대소문자, !@#$%를 포함해야 합니다.",
      }),
    passwordCheck: z.string(),
    email: z.string().email({ message: "유효한 이메일 주소를 입력하세요." }),
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordCheck"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

const JoinPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // test

  const onOpen = useModal(state => state.onOpen);

  const [policyConfirm, setPolicyConfirm] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickName: "",
      password: "",
      passwordCheck: "",
      email: email ?? "",
    },
  });

  // TODO: 일반 가입의 경우와 구분 되어야 함.
  const { mutate: confirmUser } = useMutation({
    mutationFn: async (data: UserCreateConfirmRequest) =>
      userCreateConfirm(data),
    onSuccess: data => {
      console.log("S???", data);
      form.reset();
      navigate("/");
    },
    onError: error => {
      console.log(error.message);
      console.log(ERROR_CODE[error.message as ErrorCode]);
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    confirmUser({
      nickName: values.nickName,
      email: values.email,
      hashedPassword: values.password,
    });

    // try {
    //   const res = await _PUT("/users/create/confirm", {
    //     nickName: values.nickName,
    //     email: values.email,
    //     hashedPassword: values.password,
    //   });

    //   // TODO: 계정 생성 완료시 자동 로그인

    //   form.reset();
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <main className="flex flex-col w-full sm:w-[350px] mx-auto px-4 sm:px-0 justify-start items-center py-16">
      <section className="__TITLES__ flex flex-col items-center">
        <SymbolHeader description="JOIN US! FOR MORE BENEFIT" />
      </section>

      <section className="__FORM_GROUP__ flex flex-col w-full mt-14">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row justify-between text-base text-primary">
                      UserName
                      <FormMessage className="text-xs" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="영문, 한글, 숫자 조합 2~11자"
                        {...field}
                        className="shadow focus:shadow-inner transition-shadowborder-1 border-primary-foreground/50 focus-visible:ring-0 text-primary focus-visible:ring-offset-0"
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
                        disabled={isLoading}
                        placeholder="영문 대소문자, 숫자, 특수문자(!@#$%) 8~11자"
                        type="password"
                        {...field}
                        className="shadow focus:shadow-inner transition-shadowborder-1 border-primary-foreground/50 focus-visible:ring-0 text-primary focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row justify-between text-base text-primary">
                      Password Check
                      <FormMessage className="text-xs" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="비밀번호 확인"
                        type="password"
                        {...field}
                        className="shadow focus:shadow-inner transition-shadowborder-1 border-primary-foreground/50 focus-visible:ring-0 text-primary focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-row justify-between text-base text-primary">
                      Email <FormMessage className="text-xs" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!!email || isLoading}
                        placeholder=""
                        {...field}
                        className="shadow focus:shadow-inner transition-shadowborder-1 border-primary-foreground/50 focus-visible:ring-0 text-primary focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </section>

      <PolicyListSection setPolicyConfirm={setPolicyConfirm} />

      <Button
        variant="flat"
        size="lg"
        disabled={!policyConfirm || isLoading}
        onClick={form.handleSubmit(onSubmit)}
        className="w-full mt-12"
      >
        <span>PLAYCE 가입하기</span>
      </Button>
      <IntersectionLabel
        label="PLAYCE 계정을 가지고 계신가요?"
        className="mt-16"
      />
      <Button
        variant="flat"
        size="lg"
        onClick={() => onOpen("login")}
        className="w-full mt-4"
      >
        <span>PLAYCE 로그인</span>
      </Button>
    </main>
  );
};

export default JoinPage;
