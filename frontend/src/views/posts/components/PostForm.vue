<script setup lang="ts">
import { ref } from 'vue';
import type { Post } from '@/types/postsTypes';

const props = defineProps<{
  post: Post | null;
  userId: string | null;
  onSubmit: (post: Post) => void;
  setEditor: () => void;
}>();

const title = ref(props.post?.title || '');
const body = ref(props.post?.body || '');

const handleSubmit = () => {
  if (title.value && body.value) {
    const updatedPost: Post = {
      ...props.post,
      title: title.value,
      body: body.value
    };
    props.onSubmit(updatedPost);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="title">Title</label><br>
      <input type="text" id="title" v-model="title" required />
    </div>
    <div>
      <label for="body">Body</label><br>
      <textarea id="body" v-model="body" required></textarea>
    </div>
    <div class="flex-row gap-100 pad-t-100">
        <button type="submit" class="fs-090 button-small">Save</button>
        <button @click="setEditor" class="fs-090 button-small">Cancel</button>
    </div>
  </form>
</template>