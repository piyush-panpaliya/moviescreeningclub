const reports = require('./json/reportDetailed.json')
const corr = require('./json/reportCorrected.json')
const fs = require('fs')
const moment = require('moment')

const valuesOfMem = {
	base: 1,
	silver: 2,
	gold: 3,
	diamond: 4,
}

const init = async () => {
	let res = []
	reports.forEach((report) => {
		const sum = (report.qr.unused.length || 0) + (report.qr.wasted.length || 0)
		if (sum <= 0) return
		let mem = report.membership[0]
		report.membership.forEach((membership) => {
			if (
				moment(membership.purchasedate, 'DD-MM-YYYY') >
				moment(mem.purchasedate || '19-05-1984', 'DD-MM-YYYY')
			) {
				mem = membership
			}
		})
		if (valuesOfMem[mem.memtype] < sum) {
			mem.memtype = 'diamond'
		}
		res.push({
			email: report.email,
			memtype: mem.memtype,
			validQr: sum,
			purchasedate: moment(mem.purchasedate, 'DD-MM-YYYY').toDate(),
			validitydate: moment(mem.validitydate, 'DD-MM-YYYY').toDate(),
		})
	})
	console.log(res.length)
	let v = 0
	res.forEach((r) => (v += r.validQr))
	console.log(v)
	fs.writeFileSync('./json/memToGive.json', JSON.stringify(res))
}
init()
const corrected = async () => {
	let res = []
	corr.forEach((report) => {
		const sum = report.count
		if (sum <= 0) return
		let mem = report.membership[0]
		report.membership.forEach((membership) => {
			if (
				moment(membership.purchasedate, 'DD-MM-YYYY') >
				moment(mem.purchasedate || '19-05-1984', 'DD-MM-YYYY')
			) {
				mem = membership
			}
		})
		if (valuesOfMem[mem.memtype] < sum) {
			mem.memtype = 'diamond'
		}
		res.push({
			email: report.email,
			memtype: mem.memtype,
			validQr: sum,
			purchasedate: moment(mem.purchasedate, 'DD-MM-YYYY').toDate(),
			validitydate: moment(mem.validitydate, 'DD-MM-YYYY').toDate(),
		})
	})
	console.log(res.length)
	let v = 0
	res.forEach((r) => (v += r.validQr))
	console.log(v)
	fs.writeFileSync('./json/memToGiveCorr.json', JSON.stringify(res))
}
corrected()
