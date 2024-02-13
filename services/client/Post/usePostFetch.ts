import type { PostType } from "./";
import type { Ref } from "vue";
import { ref, computed } from "vue";
import { useFetchErrorHandle } from "../../../composables/useErrorHandle";
export const usePostsFetch = () => {
  // cookie取得(basicHeadersはheaderの情報の中にreactiveがある場合はreactiveである必要がある)
  // const { basicHeaders } = useApiCookie()
  // 投稿
  const posts: Ref<PostType[] | null> = ref([]);
  const postsCount = computed<number | undefined>(() => {
    return posts.value?.length;
  });
  const push = () =>
    posts.value?.push({
      userId: 999999,
      id: 999999,
      title: "test",
      body: "test",
    });

  const fetchPosts = async (): Promise<void> => {
    //key操作が関数ラップすると refresh, clearが反映されないので明示的にkeyを指定するAsyncDataじゃなくて、useFetchで良いかな
    const { data, error } = await useAsyncData<PostType[]>(
      "posts",
      () => $fetch("https://jsonplaceholder.typicode.com/posts")
      //{headers: ...basicHeaders}
    );
    // try,catchが必要ない代わりにエラーハンドリングを行う(ここが一番の利点かな)
    useFetchErrorHandle(error);
    posts.value = data.value;
  };
  //関数ラップしないのであれば、
  // ・useAsyncDataを直に書く
  // ・状況に合わせて実行する場合は、immediateをfalseにしてexecuteを後で実行する
  // const { data, error, execute } = useAsyncData<PostType[]>('posts' ,()=> $fetch("https://jsonplaceholder.typicode.com/posts", {immediate: false})
  // await execute()

  // 結論
  //・ローカル変数に詰めるでも問題はない
  //・key操作のやり方でキャッシュ操作をするのではなく、fetchPostsにて再fetchするやり方であれば本質は同じ
  //・useFetchを使う理由は、errorハンドリングが簡単にできる。try,catchが不要になる
  // ・ただし、標準option(watchで監視することやimmediateの即時実行を阻止する)は使えくなるので注意が必要となる。

  return {
    posts,
    push,
    postsCount,
    fetchPosts,
  };
};
