<template>
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
      <v-row justify="center">
        <v-dialog id="bookmark-add-modal" v-model="createModalShow" width="750">
          <template v-slot:activator="{on, attrs}">
            <v-btn 
              id="show-btn" 
              color="primary" 
              dark
              v-bind="attrs"
              v-on="on"
            >
              Add Bookmark
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Add Bookmark</v-card-title>
            <v-card-text>
            <v-text-field
              id="create-name"
              type="text"
              v-model="createdBookmark.name"
              placeholder="Name"
              label="Name:"
            ></v-text-field>
            <v-text-field
              id="create-url"
              type="text"
              v-model="createdBookmark.url"
              placeholder="URL"
              label="URL:"
            ></v-text-field>
            <v-text-field
              id="create-color"
              type="text"
              v-model="createdBookmark.color"
              placeholder="#FFFFFF"
              label="Color:"
            ></v-text-field>
            </v-card-text>

          <v-card-actions>
            <v-row justify="end" class="mx-2">
              <v-btn
                class="primary"
                @click="onCreateSubmit"
              >
                Submit
              </v-btn>
            </v-row>
          </v-card-actions>
          </v-card>
        </v-dialog>
    </v-row>
    <div v-for="bookmark in bookmarks" :key="bookmark">
      <v-card
        class="my-2"
        color="primary"
        dark
      >
        <v-card-title>{{bookmark.name}}</v-card-title>
        <v-card-text>
          <a class="white--text" :href="`https://${bookmark.url}`">{{
            bookmark.url
          }}</a>
        </v-card-text>
      </v-card>
    </div>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/api/api";
import { Bookmark, BookmarkCreate } from "@/models/bookmark";

@Component
export default class Login extends Vue {
  bookmarks: Bookmark[] = [];
  createdBookmark: BookmarkCreate = {
    name: "",
    url: "",
    color: ""
  };
  createModalShow = false;

  ignoreError() {
    return true;
  }

  async mounted() {
    try {
      const response = await Api.fetchBookmarks();
      this.bookmarks = response;
    } catch (err) {
      this.ignoreError();
    }
  }

  async onCreateSubmit(evt: Event) {
    evt.preventDefault();
    try {
      const response = await Api.createBookmark(this.createdBookmark);
    } catch (err) {
      this.ignoreError();
    }
    this.createModalShow = false;
  }
}
</script>
