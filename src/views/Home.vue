<template>
    <div class="row align-items-center h-100">
        <div class="col-9 mx-auto">
            <div class="d-flex my-5 py-5 align-items-center justify-content-center">
                <img id="logo" class="px-3" src="@/assets/logo.svg" alt="Logo" />
                <span class="display-4 text-muted">Devmarks</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue{

}
</script>