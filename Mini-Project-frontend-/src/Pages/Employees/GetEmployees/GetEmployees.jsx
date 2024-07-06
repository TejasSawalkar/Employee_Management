import axios from "axios";
import React from "react";

const GetEmployee = async () => {
  try {
    const response = await axios.get("https://localhost:7058/api/Employee");
    return response.data;
  } catch (error) {
    console.log("There is a problem in fetching operation", error);
    throw error;
  }
};
export default GetEmployee;
