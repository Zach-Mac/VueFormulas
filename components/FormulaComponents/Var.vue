<script setup>
const props = defineProps({
	name: {
		type: String,
		required: true
	},
	units: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	value: {
		type: String
	},
	readonly: {
		type: Boolean,
		default: false
	}
})

const vmodels = inject('vmodels')
if (!vmodels) {
	vmodels = ref(null)
}

const onCalculate = inject('onCalculate')

//set default value
if (props.value) {
	vmodels[props.name] = props.value
}

//default palceholder
const placeholder = props.placeholder
	? props.placeholder
	: props.name + (props.units ? ' (' + props.units + ')' : '')

const nan = ref(false)

const value = computed({
	get() {
		return vmodels[props.name]
			? dropZeros(Number(vmodels[props.name]).toPrecision(5))
			: vmodels[props.name]
	},
	set(value) {
		// if value is a number then vmodels[props.name] = value
		// else if value is a math expression then evaluate it and set vmodels[props.name] = result

		let result = value

		if (isNaN(value)) {
			nan.value = true
			try {
				result = eval(value).toString()
			} catch (e) {
				console.error(e)
				return
			}
		} else {
			nan.value = false
		}

		vmodels[props.name] = result
	}
})
</script>

<template>
	<ion-item fill="outline">
		<ion-label v-if="!readonly" position="floating">{{
			placeholder
		}}</ion-label>
		<ion-input
			@keydown.enter="onCalculate()"
			type="text"
			:size="10"
			rows="1"
			max-rows="1"
			v-model="value"
			step="any"
			:placeholder="placeholder"
			:readonly="readonly"
		/>
	</ion-item>
	{{ nan ? value : '' }}
</template>
