"use client";

import ContactSupportButton from "@/app/components/ContactSupportButton";
import EyeIcon from "@/app/components/icons/EyeIcon";
import EyeOffIcon from "@/app/components/icons/EyeOffIcon";
import { useToast } from "@/context/ToastContext";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    addToast({
      message: JSON.stringify(data),
      duration: 5000,
      type: "success",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full xl:w-2/3 2xl:w-2/5 h-screen lg:h-full flex flex-col justify-start items-center pt-20 p-5 space-y-5 overflow-hidden relative"
    >
      <h1 className="form-title text-2xl font-medium text-zinc-800">ورود</h1>
      <p className="form-description text-sm text-zinc-400 w-full text-center">
        برای ورود به پنل کاربری لطفا اطلاعات حساب کاربری خود را وارد کنید .
      </p>
      <div className="form-control w-full relative">
        <Input
          type="text"
          label="نام کاربری"
          {...register("username", {
            required: "نام کاربری برای احراز هویت یک فیلد اجباری است!",
            minLength: {
              value: 8,
              message: "نام کاربری باید بیشتر از 8 کاراکتر باشد.",
            },
            maxLength: {
              value: 20,
              message: "نام کاربری نمی تواند بیشتر از 20 کاراکتر باشد.",
            },
          })}
          autoComplete="off"
          tabIndex={2}
        />
      </div>
      <div className="form-control w-full">
        <Input
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              tabIndex={3}
            >
              {isVisible ? (
                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          autoComplete="off"
          type={isVisible ? "text" : "password"}
          label="رمز عبور"
          {...register("password", {
            required: "رمز عبور برای احراز هویت یک فیلد اجباری است.",
            minLength: {
              value: 8,
              message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
            },
          })}
        />
      </div>

      {(errors.username || errors.password) && (
        <div className="bg-red-500/30 shadow-xl shadow-red-800/10 rounded-xl w-full p-4 space-y-3 animate-appearance-in">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="text-red-500 text-sm animate-pulse">
              {error.message}
            </p>
          ))}
        </div>
      )}

      <Button
        color="primary"
        variant="shadow"
        className="w-full font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "درحال ثبت نام..." : "ثبت نام"}
      </Button>
      <ContactSupportButton />
    </form>
  );
};

export default LoginForm;
