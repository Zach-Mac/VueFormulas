<script setup>
const { evalSolve } = useApi()

const equation = ref('')
const response = ref('')
const solution = ref('')

async function solve() {
	const [r, s] = await evalSolve(equation.value, '<||>', 'x')
	solution.value = s
}
</script>

<template>
	<ion-card title="Quick solve for x">
		<ion-input v-model="equation" type="text" placeholder="Enter formula" />
		<div class="d-flex flex-row">
			<ion-button class="me-3" variant="primary" @click="solve">
				>Solve</ion-button
			>
			<h1>x = {{ solution }}</h1>
			{{ response }}
		</div>
	</ion-card>
</template>
