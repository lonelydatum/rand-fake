import Pie from '../viz/piechart/Pie.js'
import Oscar from '../viz/oscar/Oscar.js'
import _ from 'lodash'

const vizList = [
	{label: 'CLASSIC SPIN WHEEL', id:'PIECHART', node:Pie},
	{label: 'OSCAR WINNER 2017', id:'OSCAR_WINNER_2017', node:Oscar}
]



const main =  {
	getById(id) {
		const vizFound = vizList.find((item)=>{
			return item.id === id
		})
		return vizFound
	},
	list:vizList
}

// const r = main.getById('OSCAR_WINNER_2017')

export default main