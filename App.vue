<script setup>
const pages = [
	{
		name: 'Home',
		path: '/'
	},
	{
		name: 'Chem Formulas',
		path: '/chemformulas'
	}
]
provide('pages', pages)
</script>

<template>
	<ion-app>
		<Header title="Chem Formulas" :pages="pages" />
		<ion-content>
			<ion-router-outlet></ion-router-outlet>
		</ion-content>
	</ion-app>
</template>
