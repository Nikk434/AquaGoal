import { apiBaseURL } from "./apiBaseURL";
export function callApi() {
    return apiBaseURL.get("/hello")
}