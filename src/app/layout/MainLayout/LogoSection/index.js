"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import { MENU_OPEN } from "@/redux/actions";
import LogoPayRu from "@/assets/images/logo-payru.svg";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
    >
      <Image src={LogoPayRu} width="92" height="32" />
    </ButtonBase>
  );
};

export default LogoSection;
