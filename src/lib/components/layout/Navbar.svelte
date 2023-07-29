<script>
    import Logo from "../Logo.svelte";

</script>
<header class="border-b-[1px] border-indigo-200 bg-white">
    <div class="nav-content mx-auto max-w-5xl flex flex-row items-center justify-between">
        <div class="logo-wrap">
            <Logo></Logo>
        </div>
        <div class="relative h-12 flex items-center justify-center">
            <nav id="navbar" class="flex flex-row items-center gap-4 text-sm font-semibold tracking-wide">
                <a href="/">Generator</a>
                <a target="_blank" href="https://github.com/neuralworm">Github</a>
    
            </nav>
        </div>
    </div>
    
</header>