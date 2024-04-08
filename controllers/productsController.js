const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
	const products = await Product.find();
	if (!products) return res.status(204).json({ 'message': 'No products found'});
	res.json(products);
}

const createNewProduct = async (req, res) => {
	if (!req?.body?.sku || !req?.body?.name || !req?.body?.price) {
		return res.status(400).json({ 'messgae': 'sku and name and price are required'});
	}

	try {
		const result = await Product.create({
			sku: req.body.sku,
      name: req.body.name,
      price: req.body.price,
			img: req.body.img,
			imgName: req.body.imgName
		});

		res.status(201).json(result);
	} catch (err) {
		console.error(err);
	}
}

const updateProduct = async (req, res) => {
	console.log("sku",req.body.img)
	if (!req?.body?.sku) {
		return res.status(400).json({ 'message': 'ID parameter is required'});
	}

	const product = await Product.findOne({ sku: req.body.sku }).exec();
	if (!product) {
			return res.status(400).json({ "message": `No product matches ID ${req.body.sku}.` });
	}
	if (req.body?.sku) product.sku = req.body.sku;
	if (req.body?.name) product.name = req.body.name;
	if (req.body?.price) product.price = req.body.price;
	if (req.body?.img) product.img = req.body.img;
	if (req.body?.imgName) product.imgName = req.body.imgName;
	const result = await product.save();
	res.json(result);
}

const deleteProduct = async (req, res) => {
	console.log(req.body.sku)
	if(!req?.body?.sku) return res.status(400).json({ 'message': 'Product ID required.'});

	const product = await Product.findOne({ sku: req.body.sku }).exec();
	if (!product) {
		return res.status(400).json({ "message": `No product matches ID ${req.body.sku}.` });
}
	const result = await product.deleteOne({ sku: req.body.sku });
	res.json(result);
}

const getProduct = async (req, res) => {
	if (!req?.params?.id) res.status(400).json({ 'message': 'Product ID required.'}); 

	const product = await Product.findOne({ _id: req.params.id }).exec();
	if (!product) {
			return res.status(400).json({ "message": `Product ID ${req.params.id} not found` });
	}
	res.json(product);
}

module.exports = {
	getAllProducts,
	createNewProduct,
	updateProduct,
	deleteProduct,
	getProduct
}