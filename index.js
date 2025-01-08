import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import auth from './routers/auth.js'
import cors from 'cors'

const app = express()
const port = 3000


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('mongoDB is connected'))
.catch(()=>console.log('mongoDB is not connected'))

app.get('/', (req, res) =>{
    res.send('server is runing')
})


app.use(express.json())
app.use(cors());
app.use('/auth', auth)

app.listen(port)