import { useState, useEffect } from "react";
import axiosInstance from "../service/api";

// Fetches all home-page data in a single request instead of 13+ individual
// calls. Each section component accepts the relevant slice as `initialData`
// and skips its own fetch when that prop is provided.
export function useHomeData() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/home-data")
      .then((res) => {
        if (res.data.success) {
          setHomeData(res.data.data);
        } else {
          setError("home-data endpoint returned failure");
        }
      })
      .catch((err) => {
        // Log but don't hard-fail — each component will self-fetch as fallback.
        console.warn("Aggregated home-data fetch failed, falling back to individual requests:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { homeData, loading, error };
}
