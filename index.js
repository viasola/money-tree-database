const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database')

app.use(cors())
app.use(express.json())

app.post('/expenses', async(req,res) => {
  try {
    const {name,type,amount,date} = req.body
    const newExpenses = await db.query("insert into expenses (name,type,amount,date) values($1,$2,$3,$4) returning * ",[name,type,amount,date])

    res.json(newExpenses.rows[0])

  } catch (error) {
    console.error(error.message)
  }
})

app.get('/expenses', async(req,res) => {
  try {
    const allExpenses = await db.query('select * from expenses order by date desc;') 
    res.json(allExpenses.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/expenses/current', async(req,res) => {
  try {
    
    const currentMonth = await db.query(`select * from expenses where date >= date_trunc('month',CURRENT_DATE);`) 
    res.json(currentMonth.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/expenses/monthly/:month', async(req,res) => {
  try {
    const {month} = req.params
    
    const allExpensesByMonth = await db.query(`select * from expenses where extract(month from date)=$1 order by date desc;`,[month]) 
    res.json(allExpensesByMonth.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/expenses/categories', async(req,res) => {
  try {
    const categories = await db.query('select type, SUM(amount) as "total" from expenses group by type order by total desc;') 
    res.json(categories.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/expenses/categories/top2', async(req,res) => {
  try {
    const categories = await db.query('select type, SUM(amount) as "total" from expenses group by type order by total desc;') 
    res.json(categories.rows.slice(0,2))
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/expenses/:id', async(req,res) => {
  try {
    const {id} = req.params
    const expense = await db.query(`select * from expenses where id = $1 ;`,[id]) 
    res.json(expense.rows[0])
  } catch (error) {
    console.error(error.message)
    
  }
})



app.put('/expenses/:id', async(req,res) => {
  try {
    const {id} = req.params
    const {name,type,amount,date} = req.body
    const updateToDo = await db.query('update expenses set name = $1 ,type = $2 ,amount = $3, date = $4 where id = $5;',[name,type,amount,date,id])
    res.json('expense was updated')
  } catch (error) {
    console.error(error.message)
  }
})

app.delete('/expenses/:id', async(req,res) => {
  try {
    const {id} = req.params
    
    const deleteExpense = await db.query('delete from expenses where id = $1;',[id])
    res.json('expense was deleted')
  } catch (error) {
    console.error(error.message)
  }
})

///////////////////////////income
////////////////////////////////////////

app.post('/incomes', async(req,res) => {
  try {
    const {channel,amount,date} = req.body
    const newIncome = await db.query("insert into incomes (channel,amount,date) values($1,$2,$3) returning * ",[channel,amount,date])

    res.json(newIncome.rows[0])

  } catch (error) {
    console.error(error.message)
  }
})


app.get('/incomes', async(req,res) => {
  try {
    const allIncomes = await db.query('select * from incomes order by date desc;') 
    res.json(allIncomes.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/incomes/monthly/:month', async(req,res) => {
  try {
    const {month} = req.params
    
    const allIncomesByMonth = await db.query(`select * from incomes where extract(month from date)=$1 order by date desc;`,[month]) 
    res.json(allIncomesByMonth.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

app.get('/incomes/categories', async(req,res) => {
  try {
    const categories = await db.query('select channel, SUM(amount) as "total" from incomes group by type order by total desc;') 
    res.json(categories.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

// app.get('/incomes/categories/top2', async(req,res) => {
//   try {
//     const categories = await db.query('select type, SUM(amount) as "total" from incomes group by type order by total desc;') 
//     res.json(categories.rows.slice(0,2))
//   } catch (error) {
//     console.error(error.message)
    
//   }
// })

app.get('/incomes/:id', async(req,res) => {
  try {
    const {id} = req.params
    const expense = await db.query(`select * from incomes where id = $1 ;`,[id]) 
    res.json(expense.rows[0])
  } catch (error) {
    console.error(error.message)
    
  }
})



app.put('/incomes/:id', async(req,res) => {
  try {
    const {id} = req.params
    const {channel,amount,date} = req.body
    const updateIncome = await db.query('update incomes set channel = $1 ,amount = $2, date = $3 where id = $4;',[channel,amount,date,id])
    res.json('income was updated')
  } catch (error) {
    console.error(error.message)
  }
})

app.delete('/incomes/:id', async(req,res) => {
  try {
    const {id} = req.params
    
    const deleteExpense = await db.query('delete from incomes where id = $1;',[id])
    res.json('income was deleted')
  } catch (error) {
    console.error(error.message)
  }
})



app.get('/budget', (req,res) => {
  db.query('select * from budget', (err,dbRes) => {
    res.json(dbRes.rows)
  })
})

app.put('/budget/:id', (req,res) => {
  const {id} = req.params
  const {budget_amount} = req.body
  db.query('update budget set budget_amount = $1 where id = $2;',[budget_amount,id], (err,dbRes) => {
    res.json('updated')
  })
})



app.listen(8080, () => {
  console.log('listening to port 8080');
})