import { routes } from "@/routes";
import { getCookie } from "@/utils/cookies";
import axios from "axios";

const api = axios.create({
    baseURL: routes.accounts.path as string,
    withCredentials: true
});

export const logout = async (): Promise<void> => {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) throw new Error; // Acà se puede pedir uno nuevo!
    const response = await api.post("logout/", {}, {
        headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
    });
    return response.data;
}