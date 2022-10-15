const url = 'https://www.wolframcloud.com/obj/zachmacdonald021/eval-solve-api'

async function evalSolve(formula, vars, solveFor) {
	const varsMapped = Object.fromEntries(
		Object.entries(vars).map(([key, value]) => {
			console.log('toLocalString()', value, value.replace('e', '*10^'))

			return [key, value.replace('e', '*10^')]
		})
	)

	const varsAssociation = JSONToWolframAssociations(varsMapped)
	console.log('varsAssociation:', varsAssociation)

	const solveForList = jsListToWolframList(solveFor)

	const params = new URLSearchParams({
		formula: formula,
		vars: varsAssociation,
		solveFor: solveForList
	})
	console.log('params', formula, varsAssociation, solveForList)

	const urlCall = url + '?' + params
	console.log('evalSolve call:', urlCall)

	const fetchCall = await fetch(urlCall)

	const response = await fetchCall.text()
	console.log('response', response)

	const solutions = wolframAssociationsToJSON(response.slice(1, -1))
	console.log('solutions', solutions)

	// const solution = response.match(/->\s*(.*)}/)[1]

	return [response, solutions]
}

function jsListToWolframList(jsList) {
	return '{' + jsList.join(', ') + '}'
}

function JSONToWolframAssociations(json) {
	// ex. json = {HA: "12"}

	const rules = Object.entries(json).map(([key, value]) => `${key}->${value}`)
	console.log('rules', rules) // ex. ["HA->12"]

	return '<|' + rules.join(', ') + '|>'
}

function wolframAssociationsToJSON(associations) {
	// ex. associations = "{{HA -> 12.}}""

	const rules = associations.slice(1, -1).split(',')
	console.log('rules', rules) // ex. [{"HA -> 12"}]

	const rulesMapped = rules.map(rule => rule.split('->').map(x => x.trim()))
	console.log('rulesMapped', rulesMapped) // ex. [["HA", "12"]]

	return Object.fromEntries(rulesMapped) // ex. {HA: "12"}
}

export default function () {
	return {
		evalSolve
	}
}
