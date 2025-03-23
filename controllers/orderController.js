import Order from "../models/order.js";

export function createOrder(req, res) {

    if(req.user == null){
        res.status(403).json({
            message : "Unauthorized"
        })
        return;
    }

       const body = req.body;
       const orderData = {
        orderId : "",
        email : req.user.email,
        name : body.name,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItems : [],
        total : 0

       };

       Order.find()
       .sort({
             date : -1,

       }).limit(1).then((lastBill)=>{
                   
       if(lastBill.length == 0){
        orderData.orderId = "ORD0001";
      }else{
          const lastBillId = lastBill[0];

          const lastOrderId = lastBillId.orderId;
          const lastOrderNUMBER = lastOrderId.replace("ORD","");
          const lastOrderNumber = parseInt(lastOrderNUMBER);
          const newOrderNumber = lastOrderNumber + 1;
          const newOrderNumberStr = newOrderNumber.toString().padStart(4,"0");

          orderData.orderId = "ORD" + newOrderNumberStr;

      }


      for(let i = 0; i < body.billItems.length; i++){

          const item = body.billItems[i];

        //   check if product exists
      }

      const order = new Order(orderData);

      order.save().then(
          (order)=>{
              res.json({
                  message : "Order saved successfully",
              });

           }).catch((err)=>{
               console.log(err);
               res.status(500).json({
                   message : "Order not saved",
               });
           });

           
       });
    //    console.log(lastBill);
        

}


export function getOrders(req , res){

    if(req.user == null){
        res.status(403).json({

            message : "Unauthorized"
        })
        return;
    }
   
    if(req.user.role == "admin"){

        Order.find().then(
            (orders)=>{
                res.json(orders);
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message : "Orders not found"
                })
            }
        )
    }else{
        Order.find({
            email : req.user.email
        }).then(
            (orders)=>{
                res.json(orders);
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message : "Orders not found"
                })
            }
        )
    }
}

