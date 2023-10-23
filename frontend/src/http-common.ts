import axios from "axios";

export default axios.create({
  baseURL: "https://lite-store-fa829a5bed60.herokuapp.com:5000",
  headers: {
    "Content-type": "application/json"
  }
});