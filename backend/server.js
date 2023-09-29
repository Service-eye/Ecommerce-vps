const express=require('express')

const app=express()

require('dotenv').config()

require('./db/connection')

const morgan=require('morgan') // console maa log request dekhauna ko lagi.

const bodyParser=require('body-parser')
const cors=require('cors')

const categoryRoute=require('./routes/categoryRoute')

const productRoute=require('./routes/productRoute')

const userRoute=require('./routes/userRoute')

const orderRoute=require('./routes/orderRoute')

const paymentRoute=require('./routes/paymentRoute')

// middleware-> Bich maa check garney thau, paas vaye maa aghadi janxa natra jadaina.
app.use(morgan('dev')) //development mode maa matrai use garna milne vayekale 'dev' use gareko.
app.use(bodyParser.json())
app.use('/public/uploads',express.static('public/uploads'))
app.use(cors())

// routes
app.use('/api',categoryRoute)
app.use('/api',productRoute)
app.use('/api',userRoute)
app.use('/api', orderRoute)
app.use('/api',paymentRoute)

const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server started on port ${port}.`)
})
