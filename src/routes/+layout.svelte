<script>
	import '../app.css'
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<Header />
<div class="flex bg-amber-100 items-center w-full">
	<slot />
</div>

<Footer />