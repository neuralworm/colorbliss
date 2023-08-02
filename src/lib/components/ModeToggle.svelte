<script lang="ts">
    export let toggleMode: Function;
    export let mode: string;
</script>

<div
    class="p-4 flex flex-row items-center text-xl font-bold gap-8 text-gray-900 relative z-10 "
>
    <div class="content mx-auto text-gray-400 bg-gray-200 rounded-xl p-2 px-4 text-sm md:text-base">
        <button class="p-2 px-6 md:px-12 rounded-xl"
            on:click={() => toggleMode()}
            disabled={mode == "default"}
            class:text-black={mode == "default"}
            class:bg-white={mode == "default"}
        >
            TailwWind Colors
        </button>
        <button class="p-2 px-6 md:px-12 rounded-xl"
            on:click={() => toggleMode()}
            disabled={mode == "custom"}
            class:text-black={mode == "custom"}
            class:bg-white={mode == "custom"}
        >
            Custom Colors
        </button>
    </div>
</div>
