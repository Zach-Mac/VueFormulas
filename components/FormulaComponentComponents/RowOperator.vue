<script setup>
const props = defineProps({
	cols: {
		type: Array,
		default: ['', '']
	},
	symbol: {
		type: String,
		default: ''
	}
})

const slots = useSlots()
const defaultSlot = slots.default()

const childVNodes = defaultSlot[0].children

const cols =
	props.cols.length == childVNodes.length
		? props.cols
		: props.cols.concat(
				Array(childVNodes.length - props.cols.length).fill('')
		  )
</script>

<template v-if="childVNodes">
	<template v-for="(node, i) in childVNodes">
		<ChildComponent :vnode="childVNodes[i]"> </ChildComponent>
		<FormulaSymbol v-if="i < childVNodes.length - 1">{{
			symbol
		}}</FormulaSymbol>
	</template>
</template>
