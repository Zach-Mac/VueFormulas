<script setup>
const { history } = useHistory()
</script>

<template>
	<!-- TODO: history object? maybe many (formula object, other object...) -->
	<ion-card @click="" v-for="item in history">
		<ion-row>
			{{ item.name }}
		</ion-row>
		<ion-row>
			{{ item.formula }}
		</ion-row>
		<ion-row>
			{{ item.values }}
		</ion-row>
	</ion-card>
	<!-- <latex :content="" -->
</template>
