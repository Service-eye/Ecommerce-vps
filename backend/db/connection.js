const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}) 
// env maa rakhyo vaney information secure hunxa.
.then(()=>console.log('Database connected'))
.catch(err=>console.log(err))