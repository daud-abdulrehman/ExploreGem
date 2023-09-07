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
    ////console.log(response.data);
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
    ////console.log(type);
    localStorage.setItem("token", token);
    localStorage.setItem("typeIdtoken", typeIdtoken);
    return response.data;

    // Use navigate to navigate based on user type
  } catch (error) {
    // setServerError("Invalid email or password.");
    //console.log(error);
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
    ////console.log(response.data);
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
    ////console.log(response.data);
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
    const { typeIdtoken } = response.data;
    localStorage.setItem("typeIdtoken", typeIdtoken);
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
    const { typeIdtoken } = response.data;
    localStorage.setItem("typeIdtoken", typeIdtoken);
    return response.data;
  } catch (error) {
    console.error("server error");
  }
};

export const FetchRooms = async (loginType) => {
  if (loginType === "hotel") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const hotelId = decodedToken.typeId;
      const response = await axios.get(
        `${BASE_URL}/hotel/fetch-rooms?hotelId=${hotelId}`
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
      ////console.log(formData);

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
    //console.log("You don't have the authentication for that");
    return { error: "Unauthorized access" };
  }
};

export const AddBuses = async (values, loginType) => {
  //console.log(loginType);
  if (loginType === "bus") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const busId = decodedToken.typeId;
      values.buscompanyId = busId;
      //console.log("Request Send");
      const response = await axios.post(`${BASE_URL}/bus/add-buses`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Server error:", error);
      return { error: "An error occurred" };
    }
  } else {
    //console.log("You don't have the authentication for that");
    return { error: "Unauthorized access" };
  }
};

export const AddRooms = async (values, imageFile, loginType) => {
  if (loginType === "hotel") {
    try {
      const token = localStorage.getItem("typeIdtoken");
      const decodedToken = jwt_decode(token);
      const hotelId = decodedToken.typeId;
      const formData = new FormData();
      formData.append("hotelId", hotelId);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append("image", imageFile);
      const response = await axios.post(
        `${BASE_URL}/hotel/add-rooms`,
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
    return { error: "Unauthorized access" };
  }
};

export const TravellerAccomadation = async (loginType, values) => {
  if (loginType === "traveller") {
    try {
      const { destinationcity, staybudget, bedtype } = values;
      const response = await axios.get(
        `${BASE_URL}/traveler/accommodation/filter?destinationcity=${destinationcity}&staybudget=${staybudget}&bedtype=${bedtype}`
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

export const BusTraveler = async (loginType, values) => {
  if (loginType === "traveller") {
    try {
      const {
        depaturecity,
        destinationcity,
        depaturedate,
        returndate,
        nooftravelers,
        travelbudget,
      } = values;
      const response = await axios.get(
        `${BASE_URL}/traveler/trip/filter?depaturecity=${depaturecity}&destinationcity=${destinationcity}&depaturedate=${depaturedate}&returndate=${returndate}&nooftravelers=${nooftravelers}&travelbudget=${travelbudget}`
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
