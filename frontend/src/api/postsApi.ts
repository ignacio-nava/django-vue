import axios from "axios";
import type { Post } from "@/types/postsTypes";
import { routes } from "@/routes";
import { getCookie } from "@/utils/cookies";

// Creación de la instancia de Axios
const api = axios.create({
    baseURL: routes.api.path as string
})

// GET -> Post List
export const getPosts = async (): Promise<Post[] | null> => {
    const response = await api.get('posts/')
    return response.data
}
// GET -> Post Item
export const getPostItem = async (id: string): Promise<Post | null> => {
    const response = await api.get(`posts/${id}/`)
    return response.data
}

// PUT -> Post Item
export const updatePost = async (id: number | null, post: Post): Promise<Post | null> => {
    if (id) {
        const csrfToken = getCookie('csrftoken');
        const response = await api.put(`posts/${id}/`, post, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
        })
        return response.data
    }
    return null
}

// DELETE -> Post Item
export const deletePost = async (id: number | undefined): Promise<void> => {
    if (id) {
        const csrfToken = getCookie('csrftoken');
        const response = await api.delete(`posts/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
        })
    }
} 