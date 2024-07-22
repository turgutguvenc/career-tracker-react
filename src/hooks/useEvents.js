import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchEvents = async (page) => {
//   const { data } = await axios.get(`http://127.0.0.1:5000/events?page=${page}`);
//   return data;
// };

const fetchEvents = async (page) => {
  const { data } = await axios.get(
    `https://job-tracker1-9ef445b4f214.herokuapp.com/events?page=${page}`
  );
  return data;
};

const useEvents = (page) => {
  return useQuery({
    queryKey: ["events", page],
    queryFn: () => fetchEvents(page),
    keepPreviousData: true,
  });
};

export default useEvents;
