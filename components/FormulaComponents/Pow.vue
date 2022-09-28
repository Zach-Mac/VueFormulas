<script setup>
// 2 SLOT COMPONENT

const props = defineProps({
	cols: {
		type: Array,
		default: ['', '']
	}
})

const slots = useSlots()
const defaultSlot = slots.default()

const canRender = computed(() => {
	return defaultSlot ? defaultSlot.length == 2 : false
})
</script>

<template>
	<slot v-if="false"></slot>
	<template v-if="canRender">
		<ion-row>
			<ion-col>
				<div class="ms-3 p-0">
					<ion-row>
						<ion-col size="auto"> ^ </ion-col>
						<ion-col class="p-0 pe-1">
							<ChildComponent :vnode="defaultSlot[1]">
							</ChildComponent>
						</ion-col>
					</ion-row>
				</div>
				<div class="me-3 p-0">
					<ChildComponent :vnode="defaultSlot[0]"> </ChildComponent>
				</div>
			</ion-col>
		</ion-row>
	</template>
</template>
