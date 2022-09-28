export function toFloat(string, toast) {
	if (string.includes(',')) {
		console.error('string is an array')
		const [string1, string2] = string.split(',')
		const value1 = toFloat(string1)
		const value2 = toFloat(string2)

		toast.show(
			{
				title: 'Error',
				delay: 10000,
				body: `String is an array.
Value1: ${value1}
Value2: ${value2}
Returning Value1`
			},
			{ pos: 'middle-center', variant: 'danger' }
		)

		return value1
	}
	if (string.includes('/')) {
		return string
			.split('/')
			.map(toFloat)
			.reduce((a, b) => a / b)
	} else {
		return parseFloat(string)
	}
}

export function varInExp(formulaString, variable) {
	// returns true if variable is within parentheses that follow the string '10^'
	// e.g. '10^(variable)' returns true
	// e.g. '10^(2) = variable' returns false
	const regex = new RegExp(`10\\^\\(.*${variable}.*\\)`, 'g')
	const match = formulaString.match(regex)
	return match !== null
}

export function formulaContainsLog(formula) {
	return formula.includes('log')
}

export function getVarFromFormula(formula) {
	const regex = /\b[a-zA-Z]+\b/g
	const matches = formula.match(regex)
	return matches
}

export function reactiveObjectUnRef(reactiveObject) {
	return Object.fromEntries(
		Object.entries(reactiveObject).map(([key, value]) => [key, value])
	)
}

export function equationFractionsToDecimals(fractionEquation) {
	const regex = /(\d+\/\d+)/g

	const split = fractionEquation.split(regex)
	console.log('split', split)

	const decimalEquation = split
		.map(s => (regex.test(s) ? toFloat(s) : s))
		.join('')

	return decimalEquation
}

export function dropZeros(numberString) {
	const regex = /\.*0+$/
	const match = numberString.match(regex)
	if (match) {
		return numberString.slice(0, match.index)
	}
	return numberString
}
