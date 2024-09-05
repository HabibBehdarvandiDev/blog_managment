import Navbar from "@/components/ui/navbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-full">
      <Navbar />
      <main className="w-full px-5 py-4">{children}</main>
    </div>
  );
}
