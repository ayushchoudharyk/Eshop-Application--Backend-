const Product = require('../models/').product;

const pagination = async (req, res, next)=>{
  try {   
    const pageNo = parseInt(req.query.pageNo);
    const pageSize = parseInt(req.query.pageSize);
    const start = pageNo * pageSize;
    const end = (pageNo+1) * pageSize;

    const {category, direction, name, sortBy} = req.query;
    console.log("category ", category);
    console.log("direction ", direction);
    console.log("name ", name);
    console.log("sortBy ", sortBy);

    const filterQuery = {};

    if(category){
      filterQuery.category = category;
    }
    if(name){
      let regexPattern = new RegExp(`.*${name}.*`);
      filterQuery.name = {"$regex" : regexPattern, "$options" : "i"};
    }
    const sortItem = sortBy ? sortBy : "productId";
    
    const sortDirection = direction ? direction==="ASC" ? 1 : -1 : -1;

    const sortQuery = {};
    sortQuery[sortItem] = sortDirection;

    console.log("filterQuery ", filterQuery);
    console.log("sortItem ", sortItem);
    console.log("sortDirection", sortDirection);

    try {
      const results = {};
      if(start > 0){
        results.previous = {
          page : pageNo - 1,
          pageSize
        }
      }
      if(end < await Product.find(filterQuery).count()){
        results.next = {
          page : pageNo + 1,
          pageSize
        }
      }
      console.log("start : ", start, " end : ", end);
      const products = pageSize ? await Product.find(filterQuery).sort(sortQuery).limit(pageSize).skip(start)
        : await Product.find(filterQuery).sort(sortQuery);
      results.content = products;
      res.results = results;
      next();
    } catch (err) {
      console.log(err);
      res.status(404).json({message : "NOT FOUND"});
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occurred, please try again"});
  }
};


module.exports = {pagination};