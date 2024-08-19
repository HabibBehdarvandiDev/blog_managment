import Link from "next/link";
import Container from "../Container";

const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-6 py-4">
      <Container>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-primary"
            prefetch={false}
          >
            مدیریت وبلاگ تسکوگیم
          </Link>
        </div>
        <div className="group relative">{/* user action */}</div>
      </Container>
    </header>
  );
};

export default Header;
