<script>
    import code from "../../assets/code.png";
    import tailwind from "../../assets/tailwind.svg";
</script>

<div
    id="copy-buttons"
    class="flex flex-row items-center justify-center mb-3 gap-4 max-w-full"
>
    <!-- COPY BUTTONS -->
    <div id="copy-buttons" class="flex flex-row gap-2">
        <button
            class="w-12 h-12 flex items-center justify-center bg-white border-[2px] border-black/20 border-opacity-20 rounded-xl hover:opacity-60"
            on:click={() => {}}
        >
            <img src={tailwind} class="w-6" alt="" />
        </button>
        <button
            class="w-12 h-12 flex items-center justify-center bg-white border-[2px] border-black/20 border-opacity-20 rounded-xl hover:opacity-60"
            on:click={() => {}}
        >
            <img src={code} class="w-6 invert" alt="" />
        </button>
    </div>
</div>
