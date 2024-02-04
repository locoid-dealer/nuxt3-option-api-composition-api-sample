<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import type { Ref } from "vue";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// 投稿
const posts:Ref<PostType[]> = ref([]);
const postsCount = computed<number>(() => {
  return posts.value.length;
});
const fetchPosts = async (): Promise<void> => {
  const { data } = await useFetch("https://jsonplaceholder.typicode.com/posts");
  // HACK: 型アサーションを利用するのは良くない。
  // 調べるとuseFetchの型定義は地獄だったので、useFetch用のジェネリクスを用意すると良さそう。
  posts.value = data.value as PostType[];
};

// mountedフックで代入するどうでもいいやつ
const mountedValue: Ref<string> = ref("");
const assignDummyDataOnMounted = (): void => {
  mountedValue.value =
    "mountedフックで代入した、なーんの意味もない値なんだよね〜";
};

// 投稿の表示
const isPostsShown: Ref<boolean> = ref(false);
const showPosts = (): void => {
  isPostsShown.value = !isPostsShown.value;
};

// createdフック
await fetchPosts();

onMounted(() => {
  assignDummyDataOnMounted();
});
</script>

<template>
  <div>
    <h1 style="color: green">CompositionAPIコンポーネント</h1>
    <p>{{ postsCount }}件の投稿があります</p>
    <p>{{ mountedValue }}</p>
    <button @click="showPosts()">投稿を見る</button>

    <div v-show="isPostsShown">
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
