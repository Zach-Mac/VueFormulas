import { reactive } from 'vue'

const history = reactive([])

function addFormulaToHistory(name, formula, values) {
	const obj = { name, formula, values }

	// Object.entries(values).forEach([key, value] => {

	// })

	history.push(obj)
}

export default function () {
	return {
		history,
		addFormulaToHistory
	}
}
