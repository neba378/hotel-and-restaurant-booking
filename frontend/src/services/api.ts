export const fetchListings = async () => {
  const response = await fetch("/api/listings");
  const data = await response.json();
  return data;
};
