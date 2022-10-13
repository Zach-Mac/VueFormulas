<script setup>
const { solution, evalSolve } = useApi()

const expression = ref('')
const output = ref('')

function solve() {}
</script>

<template>
	<ion-card title="Quick calculator">
		<ion-row>
			<ion-col>
				<ion-input
					class="me-3"
					v-model="expression"
					type="text"
					placeholder="Enter expression"
				/>
			</ion-col>
			<ion-col>
				<h1>= {{ output }}</h1>
			</ion-col>
		</ion-row>
		<ion-button class="me-3" variant="primary" @click="solve">
			Solve
		</ion-button>
	</ion-card>
</template>
