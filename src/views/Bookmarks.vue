<template>
  <el-row type="flex">
    <el-card v-for="(bookmark, i) in bookmarks" :key="i" type="box-card">
      <div class="card-text">{{bookmark.name}}</div>
    </el-card>
  </el-row>
</template>

<script lang="ts">
import { Api } from "@/api/api";
import { defineComponent, onMounted, ref } from "vue";
import { useState } from "@/store/store";

export default defineComponent({
  name: "Bookmarks",
  setup() {
    const state = useState();
    const token = state.getToken();
    if (!token) {
      return {};
    }
    const bookmarks = ref();
    onMounted(async () => {
      bookmarks.value = await Api.fetchBookmarks(token);
    });
    console.log(bookmarks);

    return {
      bookmarks,
    };
  },
});
</script>
