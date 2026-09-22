import { useEffect, useState } from "react";
import "./App.css";

type ApiStatus = "checking" | "connected" | "unavailable";

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    const controller = new AbortController();

    async function checkApi() {
      try {
        const response = await fetch("/api/health", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        setApiStatus("connected");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setApiStatus("unavailable");
      }
    }

    void checkApi();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Household meal planning</p>
        <h1>MealCue</h1>
        <p className="description">
          Remember meals your household enjoys and make weekly planning easier.
        </p>

        <p className={`api-status api-status--${apiStatus}`} aria-live="polite">
          API: {apiStatus}
        </p>
      </section>
    </main>
  );
}

export default App;
