<script>
    import {defaultColors, defaultSteps} from '../data/DefaultColors'
</script>

<div >
    {#each defaultColors as color}
        <div class="flex flex-row">
            {#each defaultSteps as step}
                <div class={`bg-${color}-${step}}`}></div>
            {/each}
        </div>
    {/each}
</div>