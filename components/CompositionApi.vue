<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import type { Ref } from "vue";
import { usePostsFetch } from "../services/client/Post/usePostFetch";

// 投稿
const { posts, push, postsCount, fetchPosts } = usePostsFetch();

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
// 自社プロダクトは見ている感じsuspenseではなくlazy(全てがfetchされawaitが完了してから画面が描画されているわけではない).
// awaitにするかは要検討. top level awaitはsuspense modeになる。awaitにしない場合はlazy
fetchPosts();

onMounted(() => {
  assignDummyDataOnMounted();
});

// 標準API refreshは使えない。
// const refresh = ()=> refreshNuxtData('posts')
// const nuxtData = ()=> useNuxtData('posts')
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
    <button @click="fetchPosts()">refresh</button>
    <button @click="push()">push</button>
  </div>
</template>
