import axios from "axios";
import jwt_decode from "jwt-decode";
//import { useAuth } from "../AuthContext/AuthContext";
const BASE_URL = "http://localhost:8000";

export const AddUser = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token, typeIdtoken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("typeIdtoken", typeIdtoken);
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const GetUser = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token, typeIdtoken } = response.data;
    //console.log(type);
    localStorage.setItem("token", token);
    localStorage.setItem("typeIdtoken", typeIdtoken);
    return response.data;

    // Use navigate to navigate based on user type
  } catch (error) {
    // setServerError("Invalid email or password.");
    console.log(error);
  }
};

export const addTravellerDetails = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    values.userId = userId;
    const response = await axios.post(`${BASE_URL}/traveler/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const addBusCompany = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    values.userId = userId;
    const response = await axios.post(`${BASE_URL}/bus/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const addAgent = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    values.userId = userId;
    const response = await axios.post(`${BASE_URL}/agent/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const addHotel = async (values) => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    values.userId = userId;
    const response = await axios.post(`${BASE_URL}/hotel/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const fetchTravelPlans = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/agent/added-trips`, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const fetchHotelRooms = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/hotel/added-rooms`, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const fetchBuses = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/hotel/added-bus`, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const AddPlan = async (values, loginType) => {
  console.log(loginType);
  if (loginType === "agent") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const agentId = decodedToken.userId;
      values.agentId = agentId;
      const response = await axios.post(`${BASE_URL}/agent/add-plans`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("server error");
    }
  } else {
    console.log("You don't have the authentication for that");
  }
};
