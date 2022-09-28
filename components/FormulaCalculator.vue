<script setup>
const { evalSolve } = useApi()

const response = ref(null)
const solution = ref(null)

const { addFormulaToHistory } = useHistory()

const alert = ref('')

const props = defineProps({
	name: {
		type: String,
		required: true
	},
	formula: {
		type: String,
		required: true
	},
	vars: {
		type: Array,
		required: false
	},
	varsNeedSet: {
		type: Number,
		default: 1
	}
})
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const numVars = ref(0)
const vmodels = reactive({})

if (props.vars && props.vars.length > 0) {
	numVars.value = props.vars.length
	props.vars.forEach(v => {
		vmodels[v] = ''
	})
} else {
	numVars.value = props.formula.match(/[a-z]/g).length
	for (let i = 0; i < numVars.value; i++) {
		vmodels[alphabet[i]] = ''
	}
}

async function onCalculate() {
	// formula calculator
	const varsNotSetKeys = Object.keys(vmodels).filter(v => vmodels[v] == '')
	console.log('varsNotSetKeys:', vmodels)
	if (varsNotSetKeys.length == numVars.value - props.varsNeedSet) {
		alert.value = ''
		const varNotSetKey = varsNotSetKeys[0]

		const varsSet = Object.fromEntries(
			Object.entries(vmodels).filter(([key, value]) => value != '')
		)
		console.log('varsSet:', toRaw(varsSet))

		const [responseC, solutionC] = await evalSolve(
			props.formula,
			varsSet,
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

		addFormulaToHistory(
			props.name,
			props.logFormula ? props.logFormula : props.formula,
			vmodelsObject
		)
	} else if (varsNotSetKeys.length > numVars.value - props.varsNeedSet) {
		alert.value = 'Vars not set > 1'
		console.log('vars not set > 1:', varsNotSetKeys)
	} else {
		alert.value = 'All vars already set'
		console.log('all vars set', varsNotSetKeys)
	}
}

provide('vmodels', vmodels)
provide('onCalculate', onCalculate)

const slots = useSlots()
let defaultSlotVNodes = null
let child = null
if (slots.default) {
	defaultSlotVNodes = slots.default()
	child = defaultSlotVNodes[0]
}
</script>

<template>
	<ion-card :title="`Formula Calculator: ${name}`">
		<ion-card-header>
			<ion-card-title> Formula Calculator: {{ name }} </ion-card-title>
		</ion-card-header>
		<ion-card-content style="height: 80%">
			<ion-text color="dark">
				<ion-row class="ion-align-items-stretch" style="height: 100%">
					<ion-col class="flex-col" style="height: 100%">
						<div></div>
						<ion-row class="ion-nowrap ion-align-items-center">
							<child />
						</ion-row>
						<div>
							<ion-button variant="primary" @click="onCalculate">
								Calculate
							</ion-button>
							<h1 v-if="response">
								Full response: {{ response }}
							</h1>
							<!-- <b-alert class="m-0 ms-auto" :show="alert !== ''" variant="danger">
                            {{ alert }}
			</b-alert> -->
						</div>
					</ion-col>
				</ion-row>
			</ion-text>
		</ion-card-content>
	</ion-card>
</template>

<style scoped>
.flex-col {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
