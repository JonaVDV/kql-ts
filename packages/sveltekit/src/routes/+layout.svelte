<script lang="ts">
import Heading from "$blocks/heading.svelte";
import Image from "$blocks/image.svelte";
import Quote from "$blocks/quote.svelte";
import Text from "$blocks/text.svelte";
import { setBlocksContext } from "$lib/components";
import '../app.css';

setBlocksContext({
	heading: Heading,
	text: Text,
	image: Image,
	quote: Quote,
});

let { children } = $props();
</script>

{@render children()}
