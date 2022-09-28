<script setup>
const props = defineProps({
	base: {
		type: String,
		default: '10'
	}
})
</script>

<template>
	<FormulaText>(</FormulaText>
	<slot> </slot>
	<FormulaText>)</FormulaText>
</template>
