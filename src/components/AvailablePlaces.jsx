import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

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

        // Attempt to get the user's current location using the Geolocation API
        // If successful, sort the places based on distance to the user
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const sortedPlaces = sortPlacesByDistance(
              resData.places,
              position.coords.latitude,
              position.coords.longitude
            );
            setAvailablePlaces(sortedPlaces); // Update state with sorted places
            setIsFetching(false); // Done loading after sorting
          },
          () => {
            // If location access fails (e.g., user denies it), just use unsorted data
            setAvailablePlaces(resData.places);
            setIsFetching(false);
          }
        );
      } catch (error) {
        // Handle any errors that occur during the fetch process
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false); // Set loading state to false once fetch fails
      }
    }

    fetchPlaces();
  }, []);

  // If an error occurred during data fetching, render the Error component
  // instead of the Places list to inform the user something went wrong
  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

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
