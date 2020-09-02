<template>
    <div>
        <b-modal id="bookmark-add-modal" v-model="createModalShow">
            <b-form-group
                id="create-bookmark-name"
                label="Name:"
                label-for="create-name"
            >
                <b-form-input
                    id="create-name"
                    type="text"
                    v-model="createdBookmark.name"
                    placeholder="Name"
                />
            </b-form-group>
            <b-form-group
                id="create-bookmark-url"
                label="URL:"
                label-for="create-url"
            >
                <b-form-input
                    id="create-url"
                    type="text"
                    v-model="createdBookmark.url"
                    placeholder="URL"
                />
            </b-form-group>
            <b-form-group
                id="create-bookmark-color"
                label="Color:"
                label-for="create-color"
            >
                <b-form-input
                    id="create-color"
                    type="text"
                    v-model="createdBookmark.color"
                    placeholder="#FFFFFF"
                />
            </b-form-group>
            
            <template v-slot:modal-footer>
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="onCreateSubmit"
                >
                    Submit
                </b-button>
            </template>
        </b-modal>
        <b-button id="show-btn" variant="primary" @click="createModalShow = true">Add Bookmark</b-button>
        <div v-for="bookmark in bookmarks" :key="bookmark">
            <b-card class="m-2" bg-variant="primary" text-variant="white" :title="bookmark.name">
                <b-link class="text-white" :href="bookmark.url">{{bookmark.url}}</b-link>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Api } from "@/api/api";
import { Bookmark, BookmarkCreate } from '@/models/bookmark';

@Component
export default class Login extends Vue{
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
        } catch(err) {
            this.ignoreError();
        }
    }

    async onCreateSubmit(evt: Event) {
        evt.preventDefault();
        try {
            const response = await Api.createBookmark(this.createdBookmark);
        } catch(err) {
            this.ignoreError();
        }
        this.createModalShow = false;
    }
}
</script>