import axios from "axios";

const axiosUrl = axios.create({
  baseUrl: "http://localhost:5000",
});
const useAxios = () => {
  return axiosUrl;
  
};

export default useAxios;
