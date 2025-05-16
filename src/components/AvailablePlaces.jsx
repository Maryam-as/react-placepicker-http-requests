import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // Wrap fetch in useEffect to run it only once after the initial render,
  // avoiding repeated fetches and potential infinite loops caused by state updates
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        // Attempt to fetch data from the backend API
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        // Manually throw an error if the response status is not OK (e.g., 404 or 500)
        if (!response.ok) {
          throw new Error("Failed to fetch places.");
        }

        setAvailablePlaces(resData.places); // Update state with the fetched places
      } catch (error) {
        // Handle any errors that occur during the fetch process
        setError(error);
      }

      setIsFetching(false); // Set loading state to false once fetch completes or fails
    }

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
