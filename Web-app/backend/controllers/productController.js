import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import productKeys from '../data/productKeys.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc create a new product
// @route get /api/products/new
// @access Private/admin

// const newProduct = asyncHandler(async(req,res)=>{

// })

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = (async (req, res) => {
  console.log("coming here")

  const { name, price, description, image, brand, category, countInStock,productKey } =
    req.body
    // console.log(req.body.name,req.body.price,req.body.brand)

    for(let proKey of productKeys){
      if(proKey===productKey){
        const product = new Product({
          user:req.user._id,
          name: name,
          price: price,
          image: image,
          brand: brand,
          category: category,
          countInStock: countInStock,
          numReviews: 0,
          description: description,
          productKey:productKey,
        })
    
        await product.save();
        res.status(200).json({msg:'Product saved successfully',success:true});


      }
    }
     
  console.log("ho gaya -_-") 
  // res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock,productKey } =
    req.body
  console.log(req.body);
  const product = await Product.findById(req.params.id)
  
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.productKey = productKey

    const updatedProduct = await product.save()
    console.log("updated")
    res.json(updatedProduct)
    
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
