export async function fetchAvailablePlaces() {
  // Attempt to fetch data from the backend API
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  // Manually throw an error if the response status is not OK (e.g., 404 or 500)
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }

  return resData.places;
}
