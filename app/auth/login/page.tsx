import { checkSessionAndRedirect } from "@/lib/cookies";
import LoginForm from "./LoginForm";
import { getSessionToken } from "@/utils/helpers";

const LoginPage = async () => {
  const role = getSessionToken()?.role;
  await checkSessionAndRedirect(
    role === "admin" ? "/admin/dashboard" : "/writer/dashboard"
  );

  return (
    <section className="bg-background w-screen h-screen overflow-hidden flex">
      <LoginForm />
      <div className="hidden lg:flex w-full h-screen bg-primary items-center justify-center align-middle">
        helo
      </div>
    </section>
  );
};

export default LoginPage;
