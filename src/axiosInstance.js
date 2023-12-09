import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // 환경변수에서 baseURL 가져오기
});

export default axiosInstance;
