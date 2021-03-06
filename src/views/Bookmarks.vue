<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-row justify="center">
        <v-dialog
          id="bookmark-add-modal"
          v-model="createModalShow"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          width="750"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn id="show-btn" color="primary" dark v-bind="attrs" v-on="on">Add Bookmark</v-btn>
          </template>
          <v-card>
            <v-card-title>Add Bookmark</v-card-title>
            <v-card-text>
              <v-text-field
                id="create-name"
                v-model="createdBookmark.name"
                type="text"
                placeholder="Name"
                label="Name:"
              />
              <v-text-field
                id="create-url"
                v-model="createdBookmark.url"
                type="text"
                placeholder="URL"
                label="URL:"
              />
              <v-text-field
                id="create-color"
                v-model="createdBookmark.color"
                type="text"
                placeholder="#FFFFFF"
                label="Color:"
              />
            </v-card-text>

            <v-card-actions>
              <v-row justify="end" class="mx-2">
                <v-btn class="primary" @click="onCreateSubmit">Submit</v-btn>
                <v-btn color="primary" text @click="createModalShow = false">Cancel</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <div v-for="bookmark in bookmarks" :key="bookmark">
        <v-card class="my-2" color="primary" dark>
          <v-card-title>{{ bookmark.name }}</v-card-title>
          <v-card-text>
            <a class="white--text" :href="`https://${bookmark.url}`">
              {{
              bookmark.url
              }}
            </a>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Api } from "@/api/api";
import { Bookmark, BookmarkCreate } from "@/models/bookmark";
import Component from "vue-class-component";

@Component
export default class Login extends Vue {
  bookmarks: Bookmark[] = [];
  createdBookmark: BookmarkCreate = {
    name: "",
    url: "",
    color: "",
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
      await Api.createBookmark(this.createdBookmark);
      this.bookmarks = await Api.fetchBookmarks();
    } catch (err) {
      this.ignoreError();
    }
    this.createModalShow = false;
  }
}
</script>
