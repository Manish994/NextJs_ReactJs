"use client";
import React, { useRef } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/app/redux/features/auth/authApiSlice";
import { setCredentials } from "@/app/redux/features/auth/authSlice";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper from "../AuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";

const Login = () => {
  //
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const { push } = useRouter();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading, isError }] = useLoginMutation();

  const submitForm = async (e) => {
    e.preventDefault();

    const MobileNumber = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    try {
      const response = await login({
        MobileNumber,
        password,
        subFlag: "LogIn",
      }).unwrap();

      if (response.code === "100") {
        dispatch(setCredentials(response));
        toast.success("Successfully logged in....");
        push("/dashboard/home");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <TitleContainer>Login</TitleContainer>
        <CustomInput placeholder="Enter Email..." type="text" ref={emailRef} />
        <CustomInput
          placeholder="Enter Password..."
          type="password"
          ref={passwordRef}
        />
        <CustomButton onClick={(e) => submitForm(e)}> Submit </CustomButton>
      </FormContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const CustomInput = styled.input`
  min-width: 500px;
  min-height: 60px;
  padding: 15px;

  border-radius: 15px;
  border: 1px solid skyblue;

  margin-top: 15px;
`;

const CustomButton = styled.button`
  margin-top: 15px;
  height: 60px;

  font-size: 1.5em;
  border-radius: 10px;
  color: skyblue;
  background-color: white;
  border: 1px solid skyblue;
  cursor: pointer;
`;
