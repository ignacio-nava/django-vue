<script setup lang="ts">
import { deletePost, getPostItem, updatePost } from '@/api/postsApi';
import type { Post, PostDetailProp } from '@/types/postsTypes';
import { onMounted, ref } from 'vue';
import PostItem from './PostItem.vue';
import PostForm from './PostForm.vue';
import { isAxiosError } from 'axios';
import { redirect, routes } from '@/routes';

const props = defineProps<PostDetailProp>();

const post = ref<Post | null>(null);
const isLoading = ref<boolean>(true);
const isEditing = ref<boolean>(false);

const setEditor = () => {
    isEditing.value = !isEditing.value
}

const handleFormSubmit = async (updatedPost: Post) => {
    try {
        if (post.value && post.value.id !== undefined) {
            const updated = await updatePost(post.value?.id, updatedPost);
            post.value = updated;
            isEditing.value = false;
        } else {
            throw new Error("Post ID is missing");
        }
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response ? error.response.status : null
            if (status && ( status === 401 || status === 403 )) {
                redirect(routes.login.path as string, true)
            }
        }
    }
};

const handleRemoveItem = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (userConfirmed) {
        try {
            await deletePost(post.value?.id)
        } catch (error) {
            if (isAxiosError(error)) {
                const status = error.response ? error.response.status : null
                if (status && ( status === 401 || status === 403 )) {
                    redirect(routes.login.path as string, true)
                }
            }
        } finally {
            redirect(routes.home.path as string)
        }
    };
};

onMounted(async () => {
    try {
        if (!props.postId) throw new Error("No id for Post item")
        post.value = await getPostItem(props.postId)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
});
</script>

<template>
    <!-- While is Loading -->
    <p v-if="isLoading">Loading...</p>
    <!-- Render Item -->
    <PostItem 
        v-else-if="!isEditing"
        :post="post"
        :user-id="props.userId"
        :set-editor="setEditor"
        :remove-item="handleRemoveItem"
    />
    <!-- Form -->
    <PostForm
        v-else 
        :post="post"
        :user-id="userId"
        :on-submit="handleFormSubmit"
        :set-editor="setEditor"
    />
</template>