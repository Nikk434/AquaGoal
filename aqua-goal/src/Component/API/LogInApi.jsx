import { apiBaseURL } from "./apiBaseURL";

export function LogInApi(email, password) {
    return apiBaseURL.post("/aqua-goal/auth/authenticate", {
        email: email,
        password: password
    });
}
