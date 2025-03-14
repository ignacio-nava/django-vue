<script setup lang="ts">
import type { Post } from '@/types/postsTypes';
const props = defineProps<{
    post: Post | null;
    userId: string | null;
    setEditor: () => void;
    removeItem: () => void;
}>();
</script>

<template>
    <h2>{{ post?.title }}</h2>
    <div class="flex-column gap-050">
        <p>{{ post?.body }}</p>
            <span v-if="Number(userId) === post?.owner">
            <div class="flex-row gap-100">
                <button @click="setEditor" class="fs-090 button-small">
                    Edit
                </button>
                <button @click="removeItem" class="fs-090 button-small">
                    Delete
                </button>
            </div>
        </span>
    </div>
</template>