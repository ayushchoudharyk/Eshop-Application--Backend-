const Product = require("../models/").product;

const searchProducts =  (req, res) =>{
    res.status(200).json(res.results);
}

const getCategories = async (req, res)=>{
  try {
    const categories = await Product.find({});
    const categoryMap = new Map();
    categories.forEach(item => {
      if(!categoryMap.has(item.category)){
        categoryMap.set(item.category, 1);
      }
    });
    const categoryArr = Array.from(categoryMap.keys());
    console.log(categoryArr);
    res.status(200).json(categoryArr);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
};

const getProductById = async (req, res)=>{
  const productId = parseInt(req.params.id);
  try {
    const product = await Product.findOne({productId});
    console.log(product);
    if(product){
      res.status(200).json(product);
    } else{
      res.status(404).json({message : `No Product found for ID - ${id}!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
}

const saveProduct = async (req, res)=>{
  try {
    const {name, availableItems, price, category, description,  imageURL, manufacturer} = req.body;
    const productId = await Product.find({}).count() + 1;
    try{
      const product = new Product({
        productId : parseInt(productId),
        name,
        category,
        manufacturer,
        availableItems : parseInt(availableItems),
        price : parseFloat(price),
        imageURL,
        description
      });
      const newProduct = await product.save();
      console.log(newProduct);
      res.status(201).json(newProduct);
    }catch(err){
      console.log(err);
      res.status(400).json({message : "Incomplete / Invalid entries"});
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
}

const updateProduct= async (req, res)=>{
  try {
    const {name, availableItems, price, category, description, imageURL, manufacturer} = req.body;
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({productId});
    if(!product){
      res.status(404).json({message : `No Product found for ID - ${productId}!`});
      return;
    }
    const updatedProduct = await Product.findOneAndUpdate({productId}, {
      name,
      availableItems : parseInt(availableItems),
      price : parseInt(price),
      category,
      description,
      imageURL,
      manufacturer
    },
    {new : true});
    res.status(201).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
}

const deleteProduct = async (req, res)=>{
  const productId = parseInt(req.params.id);
  try {
    const product = await Product.findOne({productId});
    if(!product){
      res.status(404).json({message : `No Product found for ID - ${productId}!`});
      return;
    }
    try {
      const deletedProduct = await Product.deleteOne({productId});
      console.log(deletedProduct);
      res.status(200).json({message : `Product with ID - ${productId} deleted successfully!`});
    } catch (err) {
      console.log(err);
      res.status(400).json({message : "ERROR !"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occured, please try again"});
  }
}

module.exports = {searchProducts, getCategories, getProductById, saveProduct, updateProduct, deleteProduct};