import { BASE_URL } from "../constants/ApiConstants";

export const fetchPerson = async ({ queryKey }) => {
  const id = queryKey[1];

  const res = await fetch(`${BASE_URL}people/${id}`);

  if (!res.ok) {
    throw new Error("something went wrong while fetching person");
  }

  return await res.json();
};
