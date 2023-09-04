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
    console.log(response.data);
    const { token } = response.data;
    localStorage.setItem("token", token);
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
    console.log(response.data);
    const { typeIdtoken } = response.data;
    localStorage.setItem("typeIdtoken", typeIdtoken);
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
    console.log(response.data);
    const { typeIdtoken } = response.data;
    localStorage.setItem("typeIdtoken", typeIdtoken);
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

export const FetchBuses = async (loginType) => {
  if (loginType === "bus") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const buscompanyId = decodedToken.typeId;
      const response = await axios.get(
        `${BASE_URL}/bus/fetch-buses?buscompanyId=${buscompanyId}`
      );
      return response.data;
    } catch (error) {
      console.error("server error", error);
      return { error: "An error occurred" };
    }
  } else {
    return { error: "Unauthorized access" };
  }
};

export const FetchPlan = async (loginType) => {
  if (loginType === "agent") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const agentId = decodedToken.typeId;
      const response = await axios.get(
        `${BASE_URL}/agent/fetch-plans?agentId=${agentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Server error:", error);
      return { error: "An error occurred" };
    }
  } else {
    return { error: "Unauthorized access" };
  }
};

export const AddPlan = async (values, imageFile, loginType) => {
  if (loginType === "agent") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const agentId = decodedToken.typeId;

      const formData = new FormData();
      formData.append("agentId", agentId);

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append("image", imageFile); // Append the image file to the form data
      console.log(formData);

      const response = await axios.post(
        `${BASE_URL}/agent/add-plans`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Server error:", error);
      return { error: "An error occurred" };
    }
  } else {
    console.log("You don't have the authentication for that");
    return { error: "Unauthorized access" };
  }
};

export const AddBuses = async (values, loginType) => {
  if (loginType === "bus") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const busId = decodedToken.typeId;
      values.buscompanyId = busId;
      const response = await axios.post(`${BASE_URL}/bus/add-buses`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Server error:", error);
      return { error: "An error occurred" };
    }
  } else {
    console.log("You don't have the authentication for that");
    return { error: "Unauthorized access" };
  }
};
