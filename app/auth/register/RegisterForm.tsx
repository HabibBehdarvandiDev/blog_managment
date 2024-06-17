"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import InfoModal from "./InfoModal";
import ContactSupportButton from "./ContactSupportButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from "react";
import EyeOffIcon from "@/app/components/icons/EyeOffIcon";
import EyeIcon from "@/app/components/icons/EyeIcon";
import axios from "axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { User } from "@/schema";
import { debounce } from "@/utils/helpers";
import CancelCircleIcon from "@/app/components/icons/CancelCircleIcon";
import CheckmarkCircleIcon from "@/app/components/icons/CheckmarkCircleIcon";

type Inputs = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [isVisible, setIsVisible] = useState(false);
  const [usernameExist, setusernameExist] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [uChecker, setUChecker] = useState(false);
  const [checkerLoading, setCheckerLoading] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const checkUsername = async (username: string) => {
    try {
      setCheckerLoading(true);
      const response = await axios.get("/api/user");
      const data: User[] = response.data;

      const user = data.find((user) => user.username === username);

      if (user) {
        setusernameExist(true);
      } else {
        setusernameExist(false);
      }
    } catch (error) {
      //show error
    } finally {
      setCheckerLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("api/register", data);

      if (response.status !== 200) {
        // show error
      }
    } catch (error) {
      // show error
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

    if (usernameValue === "" || usernameValue.length <= 0) {
      setUChecker(false);
    } else {
      setUChecker(true);
    }
    console.log(usernameValue);

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
        <Input type="text" label="نام" {...register("first_name")} />
        <Input type="text" label="نام خانوادگی" {...register("last_name")} />
      </div>
      <div className="form-control w-full relative">
        <Input
          type="text"
          label="نام کاربری"
          {...register("username")}
          onKeyUp={handleUsernameKeyUp}
          autoComplete="false"
          onBlur={() => setUChecker(false)}
          onFocus={() => setUChecker(true)}
        />
        <div
          className={`absolute z-10 left-1/2 -translate-x-1/2 bg-white shadow-primary-100 shadow-md rounded-xl p-5 flex flex-col space-y-4 ${
            uChecker ? "visible" : "invisible"
          }`}
        >
          <Button variant="light" size="sm" className="text-zinc-800 absolute top-3 left-3" isIconOnly>
            <CancelCircleIcon className="w-4 h-4" />
          </Button>
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
                !usernameExist ? "text-green-500" : "text-red-500"
              }`}
            >
              {usernameExist ? (
                <CancelCircleIcon className="ml-2" />
              ) : (
                <CheckmarkCircleIcon className="ml-2" />
              )}
              نام کاربری {usernameValue}{" "}
              {usernameExist ? "قبلا انتخاب شده است." : "در دسترس است."}
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
            >
              {isVisible ? (
                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          label="رمز عبور"
          {...register("password")}
        />
      </div>
      <div className="form-control w-full">
        <Input
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          label="تایید رمز عبور"
          {...register("confirm_password")}
        />
      </div>

      <InfoModal />

      <Button
        color="primary"
        variant="shadow"
        className="w-full font-medium"
        type="submit"
      >
        ثبت نام
      </Button>
      <ContactSupportButton />
    </form>
  );
};

export default RegisterForm;
