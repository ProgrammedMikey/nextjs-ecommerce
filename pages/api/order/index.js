import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'
import auth from '../../../middleware/auth'
import Products from '../../../models/productModel'


connectDB()


export default async (req, res) => {
    switch(req.method){
        case "POST": 
            await createOrder(req, res)
            break;
    }
}

const createOrder = async (req,res) => {
    try {
        const result = await auth(req, res)
        const { address, mobile, cart, total } = req.body 

        const newOrder = new Orders({
            user: address, mobile, cart, total
        })

        await newOrder.save()

        res.json({
            msg: 'Payment success! We will contact you to confirm the order.',
            newOrder
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}