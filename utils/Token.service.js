import jwtDecode from "jwt-decode";

const getUser = () => {
  try {
    const userName = sessionStorage.getItem("userName");
    return userName;
  } catch (error) {
    return null;
  }
};

const getUserId = () => {
  try {
    const userId = sessionStorage.getItem("userId");
    return userId;
  } catch (error) {
    return null;
  }
};

const getToken = () => {
  try {
    const userName = sessionStorage.getItem("userName");
    const refreshToken = sessionStorage.getItem("refreshToken");

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
    const accessToken = sessionStorage.getItem("accessToken");

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

    sessionStorage.setItem("userName", userName, accessTokenCokieOptions);
    sessionStorage.setItem("userId", userId, accessTokenCokieOptions);
    sessionStorage.setItem("refreshToken", token, refreshTokenCokieOptions);
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

    sessionStorage.setItem("accessToken", accessToken, accessTokenCokieOptions);
  } catch (error) {
    return false;
  }
};

const removeUser = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.log(error);
    return false;
  }
};

const isAccessExpired = () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
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
