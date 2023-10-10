"use client";
import { useEffect } from "react";
import { Router } from "next/router";

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    // Attach the event listener using the Router object.
    Router.events.on("routeChangeComplete", handleRouteChange);

    // Remove the event listener when the component unmounts.
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return children || null;
};

export default NavigationScroll;
