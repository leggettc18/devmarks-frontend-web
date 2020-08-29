<template>
    <p>
        {{bookmarks}}
    </p>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Api } from "@/api/api";
import { Bookmark } from '@/models/bookmark';

@Component
export default class Login extends Vue{
    bookmarks: Bookmark[] = []

    async mounted() {
        try {
            const response = await Api.fetchBookmarks();
            this.bookmarks = response;
        } catch(err) {
            console.error(err);
        }
    }
}
</script>