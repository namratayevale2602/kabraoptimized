import { useState, useEffect } from "react";
import axiosInstance from "../service/api";

// Fetches all home-page data in a single request.
// If index.html fired window.__homeDataPromise before React loaded (eliminating
// the API waterfall), we consume that promise. Otherwise we fall back to a
// normal axios fetch (e.g. when navigating back to home after the first load).
export function useHomeData() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Consume the pre-fired promise from index.html if it exists.
    const pre = window.__homeDataPromise;
    if (pre) {
      delete window.__homeDataPromise; // only use once
      pre
        .then((json) => {
          if (json?.success) {
            setHomeData(json.data);
          } else {
            // Pre-fire returned a non-success response — fall back to own fetch.
            return axiosInstance.get("/home-data").then((res) => {
              if (res.data.success) setHomeData(res.data.data);
              else setError("home-data endpoint returned failure");
            });
          }
        })
        .catch((err) => {
          console.warn("home-data pre-fire failed, re-fetching:", err.message);
          setError(err.message);
        })
        .finally(() => setLoading(false));
      return;
    }

    // Normal fetch path — no pre-fire available (e.g. client-side navigation back to home).
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
        console.warn("Aggregated home-data fetch failed, falling back to individual requests:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { homeData, loading, error };
}
