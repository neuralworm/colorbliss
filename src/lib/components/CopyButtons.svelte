<script lang="ts">
    import code from "../../assets/code.png";
    import tailwind from "../../assets/tailwind.svg";
    export let copyTWCSS: Function
    export let copyCSS: Function

</script>

<div
    id="copy-buttons"
    class="flex flex-row items-center justify-end gap-4 max-w-full ml-auto"
>
    <!-- COPY BUTTONS -->
    <div id="copy-buttons" class="flex flex-row gap-2">
        <button
        title={"Copy Tailwind Classes"}
            class="p-2 px-4 flex items-center justify-center  border-2 border-white border-opacity-20 rounded-xl hover:opacity-60 gap-4 bg-blue-700 text-white font-semibold"
            on:click={() => copyTWCSS()}
        >
        <span>Copy TWCSS</span>
            <img src={tailwind} class="w-6 invert" alt="" />
        </button>
        <button
        title={"Copy CSS Style"}
            class="p-2 px-4 flex items-center justify-center  border-2 border-white border-opacity-20 rounded-xl hover:opacity-60 gap-4 bg-blue-700 text-white font-semibold"
            on:click={() => copyCSS()}
        >
        <span>Copy CSS</span>
            <img src={code} class="w-6" alt="" />
        </button>
    </div>
</div>
