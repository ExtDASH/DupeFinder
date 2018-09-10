let getBaseList = () => {
	return fetch('/getnums/base')
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

let getFileView = () => {
	return fetch('/uploads')
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
	.then(res => { res.send() })
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

let checkDupesFirst = (file) => {
	return fetch(`/getnums/searchcsv?filename=${file}`)
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
			console.log(res.json)
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

let getFileNames = () => {
	return fetch('/fileGet')
		.then(res => {
			var obj = res.json()
			return obj
		})
}

export default {
	getBaseList,
	getFileNames,
	postBaseNums,
	checkDupesFirst,
	putTheseNums,
	putNewNums,
	getYodelList,
	postYodelList,
	fileUpload,
	getFileView,
}