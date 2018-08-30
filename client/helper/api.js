var CSVDATA = () => {
	return fetch('/getnums')
		.then(res => {
			return res.json()
		})
}

var postBaseNums = data => {
	fetch('/getnums', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => res.send())
}

export default {
	CSVDATA,
	postBaseNums,
}