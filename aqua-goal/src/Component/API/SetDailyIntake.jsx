import { apiBaseURL } from "./apiBaseURL";

export function SetDailyIntakeApi(dailyIntake) {
    return apiBaseURL.post("/TrackDaily",dailyIntake);
}
export function fetchDailyIntakeApi() {
    return apiBaseURL.get("/TrackDaily")
}
export function fetchGlassNo(){
    return apiBaseURL.get("/")
}