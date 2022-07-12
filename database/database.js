const Pool = require('pg').Pool
const db = new Pool({
  
  database : 'moneytree'
})

module.exports = db