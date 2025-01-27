<script lang="ts">
	import KirbyBlocks from '$lib/components/kirby-blocks/KirbyBlocks.svelte';
	import KirbyLayouts from '$lib/components/kirby-layouts/KirbyLayouts.svelte';

	let { data } = $props();
</script>

<KirbyLayouts layouts={data.page.layouts}>
	{#snippet children(column)}
		{@const blocks = column.blocks}
		<KirbyBlocks {blocks} />
	{/snippet}
</KirbyLayouts>
