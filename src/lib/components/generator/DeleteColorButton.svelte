<script lang="ts">
    export let deleteAction: Function
</script>
<button class="text-red-500  font-semibold ml-auto block" on:click={() => deleteAction()}>
    delete node
</button>