<script lang="ts">
    import { SvelteToast } from "@zerodevx/svelte-toast";
import copyIcon from "../../assets/copy.png";
    export let code: string;
    export let label: string;
    export let copy: Function
</script>

<button class="bg-black/30 rounded-lg overflow-hidden justify-between w-full group hover:opacity-70 cursor-pointer " on:click={() => copy()}>
    <div
        class="font-mono flex justify-center p-4 flex-col relative shadow-lg"
    >
        <label for="" class="text-xs opacity-50">{label}</label>
        <code class="mt-2 overflow-hidden f font-semibold">
            {code}
        </code>
    </div>
    <div class="bg-cyan-600 h-8 flex items-center justify-center">
        <img src={copyIcon} class="invert w-4" width={32} alt="" />
    </div>
</button>
