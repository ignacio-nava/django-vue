import PostDetail from "@/views/posts/components/PostDetail.vue";
import { injectScript } from "@/utils/manager";

import type { PostDetailProp } from '@/types/postsTypes'

const element = document.querySelector<HTMLElement>('#post-item');
if (element) {
    const propsToFind = ["userId", "postId"];
    injectScript<PostDetailProp>(propsToFind, element, PostDetail)
}