import { BASE_URL } from "../constants/ApiConstants";

export const fetchStarships = async ({ queryKey }) => {
  const id = queryKey[1];

  const res = await fetch(`${BASE_URL}starships/${id}`);

  if (!res.ok) {
    throw new Error("somthing went wrong while fetching starships");
  }

  return await res.json();
};