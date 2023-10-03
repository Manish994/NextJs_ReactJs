"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useDetailsMutation } from "@/app/redux/features/details/detailsApiSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [details, { isLoading, isError }] = useDetailsMutation();

  useEffect(() => {
    console.log("useEffect is running");
    getDashboardDetails();
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

  return <Container>Home Dashboard</Container>;
};

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
