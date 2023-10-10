"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useDetailsMutation } from "@/redux/features/details/detailsApiSlice";

const About = () => {
  const dispatch = useDispatch();

  const [details, { isLoading, isError }] = useDetailsMutation();

  useEffect(() => {
    debugger;
    console.log("useEffect is running");
    // getDashboardDetails();
  }, []);

  const getDashboardDetails = async () => {
    try {
      const response = await details({
        DisplayLength: 10,
        DisplayStart: 0,
        FromDate: "",
        ToDate: "",
        Status: "",
        StatusExtra: "",
      }).unwrap();

      if (response.code === "100") {
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return <Container>About About</Container>;
};

export default About;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
