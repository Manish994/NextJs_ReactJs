import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

const getUser = () => {
  try {
    const userName = Cookie.get("userName");
    return userName;
  } catch (error) {
    return null;
  }
};

const getUserId = () => {
  try {
    const userId = Cookie.get("userId");
    return userId;
  } catch (error) {
    return null;
  }
};

const getToken = () => {
  try {
    const userName = Cookie.get("userName");
    const refreshToken = Cookie.get("refreshToken");

    if (userName && refreshToken) {
      return refreshToken;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAccessToken = () => {
  try {
    const accessToken = Cookie.get("accessToken");

    if (accessToken) {
      return accessToken;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateLocalToken = (userName, userId, token) => {
  try {
    const accessTokenCokieOptions = {
      httpOnly: false,
      //   expires: accessTokenExpiry,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    };

    const refreshTokenCokieOptions = {
      httpOnly: false,
      //   expires: refreshTokenExpiry,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    };

    Cookie.set("userName", userName, accessTokenCokieOptions);
    Cookie.set("userId", userId, accessTokenCokieOptions);
    Cookie.set("refreshToken", token, refreshTokenCokieOptions);
  } catch (error) {
    return false;
  }
};

const updateLocalAccessToken = (accessToken) => {
  try {
    const accessTokenCokieOptions = {
      httpOnly: false,
      //   expires: accessTokenExpiry,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    };

    Cookie.set("accessToken", accessToken, accessTokenCokieOptions);
  } catch (error) {
    return false;
  }
};

const removeUser = () => {
  try {
    const accessToken = Cookie.get("accessToken");
    const refreshToken = Cookie.get("refreshToken");
    const userId = Cookie.get("userId");
    const userName = Cookie.get("userName");
    if (accessToken) {
      Cookies.remove("accessToken", { path: "/" });
    }
    if (refreshToken) {
      Cookies.remove("refreshToken", { path: "/" });
    }
    if (userId) {
      Cookies.remove("userId");
    }
    if (userName) {
      Cookies.remove("userName");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const isAccessExpired = () => {
  try {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      const decodedUser = jwtDecode(accessToken);
      return new Date().getTime() > new Date(decodedUser.exp * 1000);
    }

    return true;
  } catch (error) {
    return true;
  }
};

const TokenService = {
  getToken,
  getUser,
  getUserId,
  getAccessToken,
  updateLocalToken,
  updateLocalAccessToken,
  removeUser,
  isAccessExpired,
};

export default TokenService;
