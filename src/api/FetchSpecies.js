import { BASE_URL } from "../constants/ApiConstants";

export const fetchSpecie = async ({ queryKey }) => {
  const url = queryKey[1];

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error("somthing went wrong while fetching people");
  }

  return await res.json();
};
