import { injectScript } from "@/utils/manager";
import PostsList from "@/views/posts/components/PostsList.vue";
import type { PostsListProp } from "@/types/postsTypes";

const element = document.querySelector<HTMLElement>('#posts-list');
if (element) {
    const propsToFind = ["userId"];
    injectScript<PostsListProp>(propsToFind, element, PostsList)
}
