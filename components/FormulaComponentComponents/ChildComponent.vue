<script setup>
const props = defineProps({
	vnode: {
		type: Object,
		required: true
	}
})

const child = props.vnode
</script>

<template v-if="vnode">
	<child />
</template>
