<template>
  <div>
    <div class="flex justify-center">
      <dm-button dark type="primary" rounded @click="dialogVisible = true">Add Bookmark</dm-button>
    </div>
    <transition-root appear :show="dialogVisible" as="template">
      <hu-dialog as="div" :open="dialogVisible" @close="dialogVisible = false">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <transition-child
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <dialog-overlay class="fixed inset-0" />
            </transition-child>

            <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

            <transition-child
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <dialog-title
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >Add Bookmark</dialog-title>
                <div>
                  <dm-input
                    v-model="newBookmark.name"
                    type="text"
                    name="name"
                    label="Name"
                    color="primary"
                  ></dm-input>
                  <dm-input
                    v-model="newBookmark.url"
                    type="text"
                    name="url"
                    label="URL"
                    color="primary"
                  ></dm-input>
                </div>
                <span class="dialog-footer flex space-x-4">
                  <dm-button type="danger" @click="dialogVisible = false">Cancel</dm-button>
                  <dm-button type="primary" @click="handleSubmit()">Submit</dm-button>
                </span>
              </div>
            </transition-child>
          </div>
        </div>
      </hu-dialog>
    </transition-root>
    <div class="flex justify-center">
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">Error: {{error.message}}</template>
      <template v-else-if="bookmarks">
        <div v-for="(bookmark, i) in bookmarks" :key="i" :span="8">
          <card color="primary" class="m-4">
            <div class="flex space-x-4 items-center">
              <a :href="bookmark.url">{{bookmark.name}}</a>
              <dm-button type="danger" rounded @click="handleDelete(bookmark.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </dm-button>
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
import {
  TransitionChild,
  TransitionRoot,
  Dialog as HuDialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import DmButton from "@/components/Button.vue";
import DmInput from "@/components/Input.vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Bookmarks",
  components: {
    DmButton,
    DmInput,
    Card,
    TransitionChild,
    TransitionRoot,
    HuDialog,
    DialogOverlay,
    DialogTitle,
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
