import { useState, useEffect } from "react";
import { fetchGlassNo } from "./API/SetDailyIntake";

export default function DailyTracker({ onDailyTrack }) {
  const [count, setCount] = useState(0); // Tracks the current intake count
  const [dailyGlassGoal, setDailyGlassGoal] = useState(null); // Tracks the daily goal fetched from the API
  const [error, setError] = useState(null); // Tracks errors during API calls

  // Fetch daily goal from API on component mount
  useEffect(() => {
    async function checkGlassNo() {
      try {
        const response = await fetchGlassNo();
        setDailyGlassGoal(response.data);
      } catch (error) {
        console.error("Error fetching daily goal:", error);
        setError("Failed to fetch the daily glass goal. Please try again later.");
      }
    }
    checkGlassNo();
  }, []);

  // Function to increment intake count
  const incrementCount = () => {
    const newCount = Math.min(count + 1, dailyGlassGoal || Infinity); // Prevent exceeding the goal
    setCount(newCount);
    if (onDailyTrack) onDailyTrack(newCount); // Notify parent component of the update
  };

  // Function to decrement intake count (preventing it from going below 0)
  const decrementCount = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    if (onDailyTrack) onDailyTrack(newCount);
  };

  return (
    <div className="container text-center">
      <h2>Today's Intake</h2>

      {/* Display the daily glass goal */}
      {dailyGlassGoal !== null ? (
        <p>
          <strong>Daily Goal: {dailyGlassGoal} Glasses</strong>
        </p>
      ) : (
        <p className="text-muted">
          {error || "Fetching your daily goal..."}
        </p>
      )}

      {/* Display the current intake count */}
      <p>
        <strong>Current Count: {count} Glasses</strong>
      </p>

      {/* Add progress visualization */}
      {dailyGlassGoal && (
        <div className="progress mb-3">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${(count / dailyGlassGoal) * 100}%`,
            }}
            aria-valuenow={count}
            aria-valuemin="0"
            aria-valuemax={dailyGlassGoal}
          >
            {Math.round((count / dailyGlassGoal) * 100)}%
          </div>
        </div>
      )}

      {/* Buttons for increment and decrement */}
      <button className="btn btn-primary me-2" onClick={incrementCount}>
        +
      </button>
      <button className="btn btn-secondary" onClick={decrementCount}>
        -
      </button>
    </div>
  );
}
