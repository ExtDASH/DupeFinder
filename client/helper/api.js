let getBaseList = () => {
	return fetch('/getnums')
		.then(res => {
			return res.json()
		})
}

let getYodelList = () => {
	return fetch('/getnums/yodel')
		.then(res => {
			return res.json()
		})
}

let postYodelList = data => {
	fetch('/getnums/yodel',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => {res.send()})
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

let fileUpload = (file) => {
	fetch('/upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/csv'
		},
		body: file,
	})
	.then(res => {
		res.send()
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
	getYodelList,
	postYodelList,
	fileUpload,
}