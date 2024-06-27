"use client";
import CancelCircleIcon from "@/app/components/icons/CancelCircleIcon";
import CheckmarkCircleIcon from "@/app/components/icons/CheckmarkCircleIcon";
import EyeIcon from "@/app/components/icons/EyeIcon";
import EyeOffIcon from "@/app/components/icons/EyeOffIcon";
import { User } from "@/schema";
import { debounce } from "@/utils/helpers";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ContactSupportButton from "@/app/components/ContactSupportButton";
import InfoModal from "./InfoModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/api/auth/register/schema";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";


type Inputs = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};


const RegisterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();


  const [isVisible, setIsVisible] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [uChecker, setUChecker] = useState(false);
  const [checkerLoading, setCheckerLoading] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const checkUsername = async (username: string) => {
    try {
      setCheckerLoading(true);
      const response = await axios.get(
        `/api/user/username?username=${username}`
      );
      const data: User = response.data;

      // If the username exists (200 OK response), setUsernameExist to false
      setUsernameExist(false);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          // If the username does not exist (404 response), setUsernameExist to true
          setUsernameExist(true);
        } else {
          // For other server errors (500 or other status codes), setUsernameExist to false and show an error message
          setUsernameExist(false);
          addToast({
            message:
              "مشکلی هنگام ارتباط با سرور به وجود آمد، لطفا با پشتیبانی تماس بگیرید!",
          });
        }
      } else {
        // Handle network errors or other unexpected errors
        setUsernameExist(false);
        addToast({
          message:
            "مشکلی هنگام ارتباط با سرور به وجود آمد، لطفا با پشتیبانی تماس بگیرید!",
        });
      }
    } finally {
      setCheckerLoading(false);
    }
  };

  axios.defaults.baseURL = "http://localhost:3000";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data);

      if (response.status !== 201) {
        // show message
        addToast({
          message: "تبریک میگم، شما الان جزئی از خانواده تسکوگیم هستید",
          duration: 3000,
          type: "success",
        });
        // after 2 second redirect to login
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (error) {
      addToast({
        message:
          "حساب کاربری شما ساخته نشد، لطفا به اطلاعات وارد شده دقت کنید ویا با پشتیبانی تماس بگیرید!",
        type: "error",
      });
    }
  };

  const debouncedCheckUsername = useCallback(
    debounce((value: string) => checkUsername(value), 3000), // 2000ms delay
    []
  );

  const handleUsernameKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setCheckerLoading(true);
    const value = event.currentTarget.value;
    setUsernameValue(value);
    setUChecker(!!value);
    debouncedCheckUsername(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full xl:w-2/3 2xl:w-2/5 h-screen lg:h-full flex flex-col justify-start items-center pt-20 p-5 space-y-5 overflow-hidden relative"
    >
      <h1 className="form-title text-2xl font-medium text-zinc-800">ثبت نام</h1>
      <p className="form-description text-sm text-zinc-400 w-full text-center">
        به جمع تولید کنندگان محتوای دنیای گیم بپیوندید 🎮
      </p>
      <div className="form-control w-full flex gap-4">
        <Input
          type="text"
          label="نام"
          {...register("first_name", {
            required: "نام شما یک فیلد اجباری برای ساخت حساب کاربری است.",
          })}
          autoComplete="off"
          tabIndex={0}
        />
        <Input
          type="text"
          label="نام خانوادگی"
          {...register("last_name", {
            required:
              "نام خانوادگی شما یک فیلد اجباری برای ساخت حساب کاربری شما است.",
          })}
          autoComplete="off"
          tabIndex={1}
        />
      </div>
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
          onKeyUp={handleUsernameKeyUp}
          autoComplete="off"
          onBlur={() => setUChecker(false)}
          onFocus={() => setUChecker(true)}
          tabIndex={2}
        />
        <div
          className={`absolute z-40 left-1/2 -translate-x-1/2 bg-white shadow-primary-100 shadow-md rounded-xl p-5 flex flex-col space-y-4 ${
            uChecker ? "visible" : "invisible"
          }`}
        >
          <h3 className="font-medium text-right w-full">
            در دسترس بودن نام کاربری
          </h3>
          <p className="text-sm text-zinc-300 text-right w-full">
            بررسی کنید که آیا نام کاربری که وارد کرده اید وجود دارد یا خیر.
          </p>

          {checkerLoading ? (
            <Spinner />
          ) : (
            <p
              className={`text-sm font-medium text-nowrap flex ${
                usernameExist ? "text-green-500" : "text-red-500"
              }`}
            >
              {!usernameExist ? (
                <>
                  <CancelCircleIcon className="ml-2" />
                  نام کاربری قبلا انتخاب شده است.
                </>
              ) : (
                <>
                  <CheckmarkCircleIcon className="ml-2" />
                  نام کاربری در دسترس است.
                </>
              )}
            </p>
          )}
        </div>
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

      {(errors.first_name ||
        errors.last_name ||
        errors.username ||
        errors.password) && (
        <div className="bg-red-500/30 shadow-xl shadow-red-800/10 rounded-xl w-full p-4 space-y-3 animate-appearance-in">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="text-red-500 text-sm animate-pulse">
              {error.message}
            </p>
          ))}
        </div>
      )}

      <InfoModal />

      <Button
        color="primary"
        variant="shadow"
        className="w-full font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "درحال ثبت نام..." : "ثبت نام"}
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

export default RegisterForm;
