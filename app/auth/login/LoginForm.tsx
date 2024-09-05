"use client";

import ContactSupportButton from "@/components/ui/ContactSupportButton";
import EyeIcon from "@/components/ui/icons/EyeIcon";
import EyeOffIcon from "@/components/ui/icons/EyeOffIcon";
import { useToast } from "@/context/ToastContext";
import { validateJWT } from "@/lib/session";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);

      if (response.status === 200) {
        addToast({
          message: "ورود موفقیت آمیز بود. درحال انتقال به داشبورد...",
          duration: 5000,
          type: "success",
        });
        
        try {
          const { token } = response.data;
          sessionStorage.setItem("session", token);

          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 5000);
        } catch (error) {
          addToast({
            message:
              "مشکلی هنگام لاگین بوجود آمد، لطفا با پشتیبانی تماس بگیرید!",
            duration: 5000,
            type: "error",
          });
        }
      } else {
        addToast({
          message:
            "مشکلی هنگام ارتباط با سرور به وجود آمد لطفا با پشتیبانی تماس بگیرید.",
          duration: 5000,
          type: "error",
        });
      }
    } catch (error) {
      addToast({
        message:
          "مشکلی هنگام ارتباط با سرور به وجود آمد لطفا با پشتیبانی تماس بگیرید.",
        duration: 5000,
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background w-full xl:w-2/3 2xl:w-2/5 h-screen lg:h-full flex flex-col justify-start items-center pt-20 p-5 space-y-5 overflow-hidden relative"
    >
      <h1 className="form-title text-2xl font-medium text-foreground">ورود</h1>
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
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "در حال ورود..." : "ورود"}
      </Button>
      <div className="flex gap-4 flex-col justify-around items-center">
        <Link
          className="text-sm text-primary"
          href={
            pathname.includes("/auth/login") ? "/auth/register" : "/auth/login"
          }
        >
          {pathname.includes("auth/login")
            ? "حساب کاربری ندارید؟ ساختن حساب کاربری..."
            : "حساب کاربری دارید؟ کلیک کنید..."}
        </Link>
        <ContactSupportButton />
      </div>
    </form>
  );
};

export default LoginForm;
