import { BASE_URL } from "../constants/ApiConstants";

export const fetchPeople = async ({ queryKey }) => {
  const id = queryKey[1];

  const res = await fetch(`${BASE_URL}people/?page=${id}`);

  if (!res.ok) {
    throw new Error("somthing went wrong while fetching people");
  }

  return await res.json();
};
