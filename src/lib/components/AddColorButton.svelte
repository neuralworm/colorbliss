<script lang="ts">
    export let addThird: Function
</script>

<div class="add-third-color absolute left-0 right-0 -bottom-4 flex items-center justify-center">
    <button class="bg-indigo-950 w-6 h-6 rounded-md shadow-md" on:click={()=>addThird()}>
        +
    </button>
</div>