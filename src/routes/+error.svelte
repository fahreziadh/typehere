<script lang="ts">
    import { page } from '$app/stores';
</script>

{#if $page.status === 404}
<div class="min-h-screen w-full flex justify-center items-center">
    <div class="text-center">
        <h1 class="text-5xl mb-4 font-bold">404</h1>
        <p class="text-4xl opacity-50">
            Page not found
        </p>
    </div>
</div>
{/if}