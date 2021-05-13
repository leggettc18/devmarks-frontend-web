<template>
  <div>
    <div class="flex justify-center">
      <dm-button dark type="primary" rounded @click="dialogVisible = true">Add Bookmark</dm-button>
    </div>
    <el-dialog v-model="dialogVisible" title="Add Bookmark" width="30%">
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <dm-input v-model="newBookmark.name" type="text" name="name" label="Name" color="primary"></dm-input>
        <dm-input v-model="newBookmark.url" type="text" name="url" label="URL" color="primary"></dm-input>
        <el-form-item>
          <el-color-picker v-model="newBookmark.color"></el-color-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <dm-button type="danger" @click="dialogVisible = false">Cancel</dm-button>
          <dm-button type="primary" @click="handleSubmit()">Submit</dm-button>
        </span>
      </template>
    </el-dialog>
    <div class="flex justify-center">
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">Error: {{error.message}}</template>
      <template v-else-if="bookmarks">
        <div v-for="(bookmark, i) in bookmarks" :key="i" :span="8">
          <card color="primary" class="m-4">
            <div class="flex space-x-4 items-center">
              <a :href="bookmark.url">{{bookmark.name}}</a>
              <dm-button type="danger" @click="handleDelete(bookmark.id)">Delete</dm-button>
            </div>
          </card>
        </div>
      </template>
    </div>
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
import DmButton from "@/components/Button.vue";
import DmInput from "@/components/Input.vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Bookmarks",
  components: {
    DmButton,
    DmInput,
    Card,
  },
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
