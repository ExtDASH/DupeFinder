var CSVDATA = () => {
	fetch('/getnums')
		.then(res => {
			return res.json()
		})
}

export default {
	CSVDATA,
}