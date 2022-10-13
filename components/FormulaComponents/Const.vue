<script setup>
const props = defineProps({
	name: {
		type: String,
		required: true
	}
})
</script>
<template>
	<Var :name="name" readonly />
</template>
