import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import auth from './src/middleware/auth'

import routes from './src/routes'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true, limit: '1mb'}))
app.use(express.json())

app.use(auth)

app.get('/', async (req:any, res:any) => {
    res.send('Api is working!!!')
})

app.use('/', routes)

app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running on port ${process.env.PORT||5000}`)
})