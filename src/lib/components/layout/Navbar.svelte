<script>
    import Logo from "../Logo.svelte";
    import github from '../../../assets/github-mark.svg'
</script>
<header class="border-b-[1px] border-gray-800/25 h-[60px] bg-slate-100">
    <div class="nav-content mx-auto max-w-screen-xl flex flex-row items-center justify-between h-full">
        <!-- <div class="logo-wrap">
            <Logo></Logo>
        </div> -->
        <div class="relative h-12 flex flex-row items-center justify-between px-6 xl:px-0">
            <nav id="internal-desktop-navbar" class="flex flex-row items-center gap-4 text-md font-semibold tracking-wide " >
                <a href="/">Generator</a>
                <a target="" href="/favorites">Favorites</a>
                
    
            </nav>
           
        </div>
        <nav id="external-nav" class="px-6 xl:px-0">
            <a target="_blank" href="https://github.com/neuralworm/">
            <img src={github} class="" width="24" alt=""></a>
        </nav>
    </div>
    
</header>