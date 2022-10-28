module.exports = (mongoose)=>{
  const Order = mongoose.model('order', new mongoose.Schema({
    amount : {
      type : Number,
      required : true
    },
    orderDate : {
      type : Date,
      required : true
    },
    address : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "addresse",
      required : true
    },
    product : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "product",
      required : true
    },
    quantity : {
      type : Number,
      required : true
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "user",
      required : true
    }
  },
  {timestamps : true}
  ));
  return Order;
}