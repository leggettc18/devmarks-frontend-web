<template>
  <el-row type="flex" justify="center" :gutter="20">
    <el-col v-for="(bookmark, i) in bookmarks" :key="i" :span="8">
      <el-card type="box-card" class="mv-20">
        <div class="card-text">
          <a :href="bookmark.url">{{bookmark.name}}</a>
        </div>
      </el-card>
    </el-col>
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
