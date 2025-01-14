import { apiBaseURL } from './apiBaseURL';

export function RegisterApi(userDetails) {
    return apiBaseURL.post('/aqua-goal/auth/register', userDetails);
}
