<script>
    import Footer from "$lib/components/layout/Footer.svelte";
import Navbar from "$lib/components/layout/Navbar.svelte";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import "../app.css";
    const options = {
        duration: 900,
        dismissable: false,
        theme: {
            "--toastBarHeight": 0
        }
    }
</script>
<Navbar></Navbar>
<slot />
<SvelteToast {options} />
<Footer></Footer>
