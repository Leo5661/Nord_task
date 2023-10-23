export const fetchStarships = async ({ queryKey }) => {
  const url = queryKey[1];

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error("somthing went wrong while fetching starships");
  }

  return await res.json();
};