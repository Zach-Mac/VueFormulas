const url = 'https://www.wolframcloud.com/obj/zachmacdonald021/eval-solve-api'

async function evalSolve(formula, vars, solveFor) {
	const varsMapped = Object.fromEntries(
		Object.entries(vars).map(([key, value]) => {
			console.log('toLocalString()', value, value.replace('e', '*10^'))

			return [key, value.replace('e', '*10^')]
		})
	)

	const varsAssociation =
		'<|' +
		Object.entries(varsMapped)
			.map(([key, value]) => `${key}->${value}`)
			.join(', ') +
		'|>'
	console.log('varsAssociation:', varsAssociation)

	const params = new URLSearchParams({
		formula: formula,
		vars: varsAssociation,
		solveFor: solveFor
	})
	console.log('params', formula, varsAssociation, solveFor)

	const urlCall = url + '?' + params
	console.log('evalSolve call:', urlCall)

	const fetchCall = await fetch(urlCall)

	const response = await fetchCall.text()
	console.log('response', response)

	const solution = response.slice(1, -1).split(',')[0]
	console.log('solution', solution)

	// const solution = response.match(/->\s*(.*)}/)[1]

	return [response, solution]
}

export default function () {
	return {
		evalSolve
	}
}
