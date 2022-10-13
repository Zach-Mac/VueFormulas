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
	// name: {
	// 	type: String,
	// 	required: true
	// },
	// formula: {
	// 	type: String,
	// 	required: true
	// },
	// vars: {
	// 	type: Array,
	// 	required: false
	// }
})

const vmodels = reactive({})
props.vars.forEach((v, i) => {
	vmodels[v.name] = null
})

const placeholder = (name, units) => {
	return name + (units ? ' (' + units + ')' : '')
}
</script>

<template>
	<!-- <FormulaCalculator
		:vars="vars"
		:name="name"
		:formula="formula"
		:varsNeeded="1"
	>
		<ion-row>
			<ion-col v-for="v in vars">
				<Var :name="v" />
			</ion-col>
		</ion-row>
	</FormulaCalculator> -->
	<!-- <FormulaCalculator :name="name" :formula="formula" :vars="vars">
        <ion-row>
            <ion-col v-for="v in vars">
                <Var :name="v.name" :placeholder="placeholder(v.name, v.units)" />
            </ion-col>
        </ion-row> -->
	<ion-card title="Conversion Calculator">
		<ion-row>
			<ion-col v-for="(variable, i) in vars" :key="i">
				<ion-item fill="outline">
					<ion-label position="floating">{{
						placeholder(variable.name, variable.units)
					}}</ion-label>
					<ion-input
						:ref="'inputRefs[' + i + ']'"
						type="text"
						v-model="vmodels[variable.name]"
						:placeholder="
							placeholder(variable.name, variable.units)
						"
						@keyup.enter="variable.onInput(vmodels)"
					/>
				</ion-item>
			</ion-col>
		</ion-row>
	</ion-card>
</template>
