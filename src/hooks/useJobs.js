import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchJobs = async (page) => {
//   try {
//     const { data } = await axios.get(`http://127.0.0.1:5000/jobs?page=${page}`);
//     return data;
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     throw error;
//   }
// };

export const fetchJobs = async (page) => {
  try {
    const { data } = await axios.get(
      `https://job-tracker1-9ef445b4f214.herokuapp.com/jobs?page=${page}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

const useJobs = (page) => {
  return useQuery({
    queryKey: ["jobs", page],
    queryFn: () => fetchJobs(page),
    keepPreviousData: true,
    retry: 1,
  });
};

export default useJobs;
