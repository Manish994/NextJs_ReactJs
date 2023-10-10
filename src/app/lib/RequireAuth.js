"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectCurrentUserId,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import Loading from "@/components/Loader";

const authenticatedRoutes = ["/dashboard/home"];

export default function RequireAuth({ children }) {
  const [user, setUser] = useState({});
  const currentuser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const pathname = usePathname();
  const { push } = useRouter();

  // console.log("currentuser : ", currentuser)
  useEffect(() => {
    if (
      !currentuser &&
      !currentUserId &&
      authenticatedRoutes.includes(pathname)
    )
      push("/login");

    if (currentuser) setUser(currentuser);
  }, []);

  // if (currentuser) return <Loading />;
  return <>{children}</>;
}
