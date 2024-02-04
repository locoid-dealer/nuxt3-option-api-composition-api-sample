<template>
  <div>
    <h1 style="color:red">OptionsAPIコンポーネント</h1>
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

<script>
export default {
  data() {
    return {
      posts: [],
      mountedValue: "",
      isPostsShown: false,
    };
  },

  computed: {
    postsCount() {
      return this.posts.length;
    },
  },

  created() {
    this.fetchPosts();
  },

  mounted() {
    this.assignDummyDataOnMounted();
  },

  methods: {
    async fetchPosts() {
      const { data } = await useFetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      this.posts = data;
    },

    assignDummyDataOnMounted() {
      this.mountedValue =
        "mountedフックで代入した、なーんの意味もない値なんだよね〜";
    },

    showPosts() {
      this.isPostsShown = !this.isPostsShown;
    },
  },
};
</script>
