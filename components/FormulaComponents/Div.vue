<script setup>
const slots = useSlots()
const defaultSlot = slots.default()

const child1 = defaultSlot[0]
const child2 = defaultSlot[1]
</script>

<template>
	<ion-col>
		<ion-row
			class="ion-nowrap ion-align-items-center ion-justify-content-center"
		>
			<child1 />
		</ion-row>
		<div class="space"></div>
		<div class="line"></div>
		<div class="space"></div>
		<ion-row
			class="ion-nowrap ion-align-items-center ion-justify-content-center"
		>
			<child2 />
		</ion-row>
	</ion-col>
</template>

<style scoped>
.space {
	height: 5px;
}
.line {
	width: 100%;
	height: 2px;
	background-color: rgb(0, 0, 0);
}
</style>
