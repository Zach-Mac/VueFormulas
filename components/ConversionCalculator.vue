<script setup>
const props = defineProps({
	vars: {
		type: Array,
		required: true,
		validator(vars) {
			for (const variable of vars) {
				if (
					variable.name == undefined ||
					variable.onInput == undefined
				) {
					console.error(
						'Variable must have a name and gives property:',
						variable
					)
					return false
				}
			}
			return true
		}
	}
})

const vmodels = reactive({})
props.vars.forEach((v, i) => {
	vmodels[v.name] = null
})
</script>

<template>
	<!-- <FormulaCalculator :vars="vars">
		<ion-row>
			<ion-col v-for="v in vars">
				<Var :name="v.name" />
			</ion-col>
		</ion-row>
	</FormulaCalculator> -->
	<ion-card title="Conversion Calculator">
		<ion-row>
			<ion-col v-for="(variable, i) in vars" :key="i">
				<h1>
					{{ variable.name }}
					{{ variable.units ? '(' + variable.units + ')' : '' }}:
				</h1>
				<ion-input
					:ref="'inputRefs[' + i + ']'"
					type="text"
					v-model="vmodels[variable.name]"
					:placeholder="
						variable.units
							? variable.name + ' (' + variable.units + ')'
							: variable.name
					"
					@keyup.enter="variable.onInput(vmodels)"
				/>
			</ion-col>
		</ion-row>
	</ion-card>
</template>
