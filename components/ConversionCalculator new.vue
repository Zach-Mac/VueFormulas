<!-- <script setup>

const props = defineProps({
	vars: {
		type: Array,
		required: true
	},
	name: {
		type: String,
		required: false
	},
	formulas: {
		type: String,
		required: true
	}
})

const vmodels = reactive({})
props.vars.forEach((v, i) => {
	vmodels[v] = null
})

async function onCalculate() {
	const varsSetKeys = Object.keys(vmodels).filter(v => vmodels[v] != '')
	if (varsSetKeys.length == 1) {
		const varSetKey = varsSetKeys[0]

		const varSetValue = toRaw(vmodels[varSetKey])

		const varSetAssociation = `<|${varSetKey}->${varSetValue}|>`
		console.log('varsSetAssociation:', varSetAssociation)

		const [responseC, solutionC] = await evalSolve(
			props.formulas,
			varSetAssociation,
			varNotSetKey
		)
		response.value = responseC
		solution.value = solutionC

		vmodels[varNotSetKey] = solution.value

		const vmodelsObject = toRaw(vmodels)
		console.log('vmodelsObject', vmodelsObject)

		console.log(
			'Adding to history:',
			props.logFormula ? props.logFormula : props.formula,
			vmodelsObject
		)
		addFormulaToHistory(props.name, props.formulas, vmodelsObject)
	} else {
		console.log('too many vars set')
	}
}
</script>

<template>
	<ion-card title="Conversion Calculator">
		<ion-row>
			<ion-col v-for="(variable, i) in vars" :key="i">
				<h1>
					{{ variable.name }}
					{{ variable.units ? '(' + variable.units + ')' : '' }}:
				</h1>
				<ion-input
					:ref="'inputRefs[' + i + ']'"
					type="number"
					v-model="vmodels[variable.name]"
					:placeholder="
						variable.units
							? variable.name + ' (' + variable.units + ')'
							: variable.name
					"
					@keyup.enter="calculate()"
				/>
			</ion-col>
		</ion-row>
	</ion-card>
</template> -->
