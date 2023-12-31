//"use client";

import RequireAuth from "@/lib/RequireAuth";

//import projects
import Routes from "@/layout/MainLayout/index";
import Loading from "@/components/Loader";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Routes children={children}></Routes>
      {/* <RequireAuth>{children}</RequireAuth> */}
    </>
  );
}
