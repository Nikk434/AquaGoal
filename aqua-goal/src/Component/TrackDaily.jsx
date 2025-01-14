import SetIntake from "./SetIntake";

export default function TrackDaily() {
    function handleDailyGoalSet(glasses) {
    }

    return (
        <div className="container text-center">
            <h1>Start Tracking Daily</h1>
            <SetIntake onGoalSet={handleDailyGoalSet} />
        </div>
    );
}
