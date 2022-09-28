<script setup>
const attrs = useAttrs()
</script>

<template>
	<RowOperator v-bind="attrs" symbol="*">
		<slot></slot>
	</RowOperator>
</template>
