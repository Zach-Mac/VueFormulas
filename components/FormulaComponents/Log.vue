<script setup>
const props = defineProps({
	base: {
		type: String,
		default: '10'
	}
})
</script>

<template>
	<FormulaText>Log</FormulaText>
	<p class="ion-no-padding ion-padding-top">
		<small>{{ base }}</small>
	</p>
	<Parenth>
		<slot> </slot>
	</Parenth>
</template>
