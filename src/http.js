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

export async function fetchUserPlaces() {
  // Attempt to fetch data from the backend API
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  // Manually throw an error if the response status is not OK (e.g., 404 or 500)
  if (!response.ok) {
    throw new Error("Failed to fetch user places.");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  // Send a PUT request to the backend API to update the user's selected places
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT", // Use the PUT method for updating resources
    body: JSON.stringify({ places }), // Convert data into a JSON string to send in the request body
    headers: {
      // Set the content type to JSON so the server knows how to parse it
      "Content-Type": "application/json",
    },
  });

  // Parse the JSON response from the server
  const resData = await response.json();

  // If the response is not OK (status code outside 200–299), throw an error
  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
