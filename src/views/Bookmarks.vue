<template>
  <div>
    <el-button @click="dialogVisible = true">Add Bookmark</el-button>
    <el-dialog v-model="dialogVisible" title="Add Bookmark" width="30%">
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <el-form-item label="Name">
          <el-input v-model="newBookmark.name" type="text" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="Url">
          <el-input v-model="newBookmark.url" type="text" placeholder="URL (www.example.com)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-color-picker v-model="newBookmark.color"></el-color-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit()">Submit</el-button>
        </span>
      </template>
    </el-dialog>
    <el-row type="flex" justify="center" :gutter="20">
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">Error: {{error.message}}</template>
      <template v-else-if="bookmarks">
        <el-col v-for="(bookmark, i) in bookmarks" :key="i" :span="8">
          <el-card type="box-card" class="mv-20">
            <div class="card-text">
              <a :href="bookmark.url">{{bookmark.name}}</a>
              <el-button type="danger" @click="handleDelete(bookmark.id)">Delete</el-button>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useState } from "@/store/store";
import { Bookmark, BookmarkCreate } from "@/models/bookmark";
import { useResult } from "@vue/apollo-composable";
import {
  GetBookmarksDocument,
  GetBookmarksQuery,
  useGetBookmarksQuery,
  useNewBookmarkMutation,
  useDeleteBookmarkMutation,
} from "../generated/graphql";

export default defineComponent({
  name: "Bookmarks",
  setup() {
    const state = useState();
    const token = state.getToken();
    const dialogVisible: Ref<boolean> = ref(false);
    if (!token) {
      return {};
    }
    const { result, loading, error } = useGetBookmarksQuery();
    const bookmarks = useResult(result);

    const newBookmark = ref({
      name: "",
      url: "",
      color: "",
    } as BookmarkCreate);

    const { mutate: submitNewBookmark } = useNewBookmarkMutation(() => ({
      variables: newBookmark.value,
      update: (cache, { data: submitBookmark }) => {
        const data = cache.readQuery<GetBookmarksQuery>({
          query: GetBookmarksDocument,
        });
        const submittedBookmark = {
          name: submitBookmark?.newBookmark.name,
          url: submitBookmark?.newBookmark.url,
          color: submitBookmark?.newBookmark.color,
        } as Bookmark;
        if (data?.bookmarks) {
          cache.writeQuery<GetBookmarksQuery>({
            query: GetBookmarksDocument,
            data: { bookmarks: [...data.bookmarks, submittedBookmark] },
          });
          console.log(data);
        }
      },
    }));

    const handleSubmit = () => {
      submitNewBookmark();
      dialogVisible.value = false;
    };

    const deleteId = ref<number | null>(null);

    const { mutate: deleteBookmark } = useDeleteBookmarkMutation(() => ({
      variables: { id: `${deleteId.value}` },
      update: (cache, { data: deletedBookmark }) => {
        const data = cache.readQuery<GetBookmarksQuery>({
          query: GetBookmarksDocument,
        });
        const newData = data?.bookmarks?.filter((bookmark) => {
          bookmark.id != `${deleteId.value}`;
        });
        if (data?.bookmarks) {
          cache.writeQuery<GetBookmarksQuery>({
            query: GetBookmarksDocument,
            data: { bookmarks: newData },
          });
        }
      },
    }));

    const handleDelete = (id: number) => {
      deleteId.value = id;
      deleteBookmark();
    };

    return {
      dialogVisible,
      bookmarks,
      loading,
      error,
      newBookmark,
      handleSubmit,
      handleDelete,
    };
  },
});
</script>
