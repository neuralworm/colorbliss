<script lang="ts">
    import heart from '../../../assets/heart.svg'
    export let active: boolean

</script>

<button class="bg-black rounded-full h-6 w-6 flex items-center justify-center">
    <i>
        <img src={heart} class:invert={!active} class="w-3" alt="">
    </i>
</button>