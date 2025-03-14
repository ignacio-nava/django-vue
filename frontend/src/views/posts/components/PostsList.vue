<script setup lang="ts">
import { getPosts } from '@/api/postsApi';
import { getPostDetailPath } from '@/routes';
import type { Post, PostsListProp } from '@/types/postsTypes';
import { onMounted, ref } from 'vue';

const props = defineProps<PostsListProp>();

const posts = ref<Post[] | null>(null);
const loading = ref<boolean>(true)

const className: string = "flex-column list-none gap-200"; 

onMounted(async () => {
    try {
        posts.value = await getPosts();
    } catch (error) {
        console.log("Faild to load Posts", error)
    } finally {
        loading.value = false
    }
});


</script>

<template>
    <p v-if="loading">Loading...</p>
    <div v-else>
        <div v-if="posts && (posts?.length < 1)" class="flex-column gap-100">
            <h3 >We don't have posts yet...</h3>
        </div>
        <ul v-else :class="className">
            <li v-for="post in posts" :key="post.id" class="flex-column gap-100 list-items">
                <h2>{{ post.title }}</h2>
                <div class="flex-column gap-050">
                    <p>{{ post.body?.substring(0, 200) + '...'}}</p>
                    <span>
                        <a v-if="post.id" :href="getPostDetailPath(post.id)" class="fs-090 button-small">
                            View More
                        </a>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>