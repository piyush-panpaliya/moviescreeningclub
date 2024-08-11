const reports = require('./json/report.json')
const fs = require('fs')
const mems = require('./json/mem.json')
const qrs = require('./json/qrs.json')

const valuesOfMem = {
	base: 1,
	silver: 2,
	gold: 3,
	diamond: 4,
}

const init = async () => {
	let res = []
	reports.forEach((rep) => {
		let values = 0
		rep.membership.forEach((mem) => (values += valuesOfMem[mem]))
		const totalQR = Object.values(rep.qr).reduce((acc, val) => acc + val, 0)
		if (totalQR !== values) {
			res.push({ data: rep, err: 'values not matched' })
		}
		const qrsUser = qrs.filter(
			(qr) => qr.email.toLowerCase() === rep.email.toLowerCase()
		)
		const memsUser = mems.filter(
			(mem) => mem.email.toLowerCase() === rep.email.toLowerCase()
		)
		if (qrsUser.length < 1 || memsUser.length < 1) {
			res.push({ data: rep, err: 'both not found' })
		} else {
			if (qrsUser.length < 1) {
				res.push({ data: rep, err: 'qr not found' })
			}
			if (memsUser.length < 1) {
				res.push({ data: rep, err: 'mem not found' })
			}
		}
		if (qrsUser.length !== totalQR) {
			res.push({ data: rep, err: 'qr length not matched' })
		}
		if (memsUser.length !== rep.membership.length) {
			res.push({ data: rep, err: 'mem not matched' })
		}
	})
	console.log(res.length)
	fs.writeFileSync('./json/error.json', JSON.stringify(res))
}
init()
