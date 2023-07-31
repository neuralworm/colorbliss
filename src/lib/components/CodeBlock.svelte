<script lang="ts">
    import copy from '../../assets/copy.png'
    export let code: string
    export let label: string

</script>

<div class="bg-black text-white flex justify-center p-4 flex-col rounded-lg shadow-md group hover:opacity-70 cursor-pointer relative overflow-hidden">
    <label for="" class="text-xs opacity-50 ">{label}</label>
    <code class="mt-2 overflow-hidden">
        {code}
    </code>
    <div class="overlay absolute top-0  right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100  p-2">
        <img src={copy} width={32} alt="">
    </div>
</div>