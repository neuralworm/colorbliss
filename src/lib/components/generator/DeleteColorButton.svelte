<script lang="ts">
    export let deleteAction: Function
</script>
<button class="text-red-500 font-semibold" on:click={() => deleteAction()}>
    delete
</button>