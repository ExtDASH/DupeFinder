let getBaseList = () => {
	return fetch('/getnums')
		.then(res => {
			return res.json()
		})
}

let postBaseNums = data => {
	fetch('/getnums', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => res.send())
}

let checkDupesFirst = () => {
	return fetch('/getnums/searchcsv')
		.then(res => {
			return res.json()
		})
}

let putTheseNums = () => {
	return fetch('/getnums/csvput')
		.then(res => {
			return res.json()
		})
}

//then...

let putNewNums = (data) => {
	
	fetch('/getnums', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data.field1),
	})
	.then(res => res.send())
}

export default {
	getBaseList,
	postBaseNums,
	checkDupesFirst,
	putTheseNums,
	putNewNums,
}