export const fetchVehicles = async ({ queryKey }) => {
  const url = queryKey[1];

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error("somthing went wrong while fetching vehicles");
  }

  return await res.json();
};