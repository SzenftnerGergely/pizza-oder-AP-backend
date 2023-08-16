import express from "express"
import fs from "fs/promises"
import type { Request, Response } from "express"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('data'))

const port = 3000

app.get('/api/pizzas', async (req: Request, res: Response) => {
  const pizzasData = await fs.readFile("./data/pizzascript.json", "utf-8")
  res.send(JSON.parse(pizzasData)) 
})

app.post('/api/orders', async (req: Request, res: Response) => {
  const {pizza, date, name, zipCode, city, street, houseNumber} = req.body

  let newOrder = []
  newOrder.push({pizza, name, date, zipCode, city, street, houseNumber})
  await fs.writeFile(`./orders/order_${name}_${date}.json`, JSON.stringify(newOrder), "utf-8")

  res.sendStatus(200) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})