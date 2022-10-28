module.exports = (mongoose)=>{
  const Address = mongoose.model("addresse", new mongoose.Schema({
    name : {
      type : String,
      required : true
    },
    city : {
      type : String,
      required : true
    },
    state : {
      type : String,
      required : true
    },
    street : {
      type : String,
      required : true
    },
    contactNumber : {
      type : Number,
      required : true
    },
    landmark : {
      type : String
    },
    zipcode : {
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
  return Address;
}