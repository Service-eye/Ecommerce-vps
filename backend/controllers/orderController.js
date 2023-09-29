const OrderItem=require('../models/orderItemModel')
const Order=require('../models/orderModel')

// post order:
exports.postOrder=async(req,res)=>{
    // at first post to orderitem model and return the stored id of that orderitem.
    const orderItemsIds=Promise.all(req.body.orderItems.map(async orderItemData=>{
        let newOrderItem=new OrderItem ({
            quantity:orderItemData.quantity,
            product:orderItemData.product
        })

        newOrderItem=await newOrderItem.save()
        return newOrderItem._id

    }))
    const orderItemIdResolved=await orderItemsIds

    // calculate total price:
    const totalAmount=await Promise.all(orderItemIdResolved.map(async orderId=>{
        const itemOrder=await OrderItem.findById(orderId).populate('product','product_price')
        const totals=itemOrder.quantity*itemOrder.product.product_price  // eauta table baata arko maa jada . . gardai jane.
        return totals  // array maa dinxa, [400,1000] 200 ko 2 ota, 500 ko eauta.
    }))
    const totalPrice=totalAmount.reduce((a,b)=>a+b, 0)

    // Post data to order model:
    let order=new Order({
        orderItems:orderItemIdResolved,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        totalPrice:totalPrice,
        user:req.body.user
    })
    order=await order.save()
    if(!order){
        return res.status(400).json({error:'Failed to make order.'})
    }
    res.send(order)
}

// order list:
exports.orderList=async(req,res)=>{
    const order=await Order.find()
    .populate('user','name')
    .sort({createdAt:-1})  // descending order.
    if(!order){
        return res.status(400).json({error:"something went wrong in orderlist."})
    }
    res.send(order)
}

// order details:
exports.orderDetails=async (req,res)=>{
    const order=await Order.findById(req.params.id)
    .populate('user','name')
    .populate({
        path:'orderItems',populate:{
            path:'product', populate:'category'
        }
    })
    if(!order){
        return res.status(400).json({error:"something went wrong in orderlist."})
    }
    res.send(order)
}

// update status
exports.updateStatus=async(req,res)=>{
    const order=await Order.findByIdAndUpdate(
        req.params.id,
        {status:req.body.status},
        {new:true}
    )
    if(!order){
        return res.status(400).json({error:"something went wrong in orderlist."})
    }
    res.send(order)
}

// order list of specific user:
exports.userOrdersList=async (req,res)=>{
    const order=await Order.find({user:req.params.userid})  // user maa vako id ra params bata pathako same vayema matrai dekhinxa.
    .populate({
        path:'orderItems',populate:{
            path:'product', populate:'category'
        }
    })
    if(!order){
        return res.status(400).json({error:"something went wrong in orderlist."})
    }
    res.send(order)
}