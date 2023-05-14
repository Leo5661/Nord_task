import { BASE_URL } from "../constants/ApiConstants";

export const fetchSearchQuery = async ({ queryKey }) => {
  const query = queryKey[1];

  if (query === "") {
    return [];
  }

  const res = await fetch(`${BASE_URL}people/?search=${query}`);

  if (!res.ok) {
    throw new Error("somthing went wrong while fetching people");
  }

  return await res.json();
};
