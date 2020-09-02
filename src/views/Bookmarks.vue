<template>
    <div>
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
import { Bookmark } from '@/models/bookmark';

@Component
export default class Login extends Vue{
    bookmarks: Bookmark[] = []

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
}
</script>