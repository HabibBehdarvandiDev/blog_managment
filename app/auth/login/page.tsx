import { checkSessionAndRedirect } from "@/lib/cookies";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  await checkSessionAndRedirect("/dashboard");

  return (
    <section className="bg-white dark:bg-zinc-900 w-screen h-screen overflow-hidden flex">
      <LoginForm />
      <div className="hidden lg:flex w-full h-screen bg-primary items-center justify-center align-middle">
        helo
      </div>
    </section>
  );
};

export default LoginPage;
