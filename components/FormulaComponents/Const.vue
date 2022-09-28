<script setup>
const props = defineProps({
	name: {
		type: String,
		required: true
	}
})
</script>
<template>
	<FormulaText>{{ name }}</FormulaText>
</template>
