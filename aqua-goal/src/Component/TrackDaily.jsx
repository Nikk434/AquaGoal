import SetIntake from "./SetIntake";

export default function TrackDaily() {
    function handleDailyGoalSet(glasses) {
        console.log("Daily goal set to:", glasses);
        // Additional logic for daily tracking can be added here
    }

    return (
        <div className="container text-center">
            <h1>Start Tracking Daily</h1>
            <SetIntake onGoalSet={handleDailyGoalSet} />
        </div>
    );
}
