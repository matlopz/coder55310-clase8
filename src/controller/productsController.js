const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const HTTP_STATUS_CODE = require('../constants/error.constants');

router.get('/', async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(HTTP_STATUS_CODE.OK).json(products);
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProductById(pid);
    if (product) {
      res.status(HTTP_STATUS_CODE.OK).json(product);
    } else {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productsService.addProduct(newProduct);
    res.status(HTTP_STATUS_CODE.CREATED).json(addedProduct);
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    const updatedProductResult = await productsService.updateProduct(pid, updatedProduct);
    if (!updatedProductResult) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Product not found' });
    } else {
      res.status(HTTP_STATUS_CODE.CREATED).json(updatedProductResult);
    }
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    await productsService.deleteProduct(pid);
    res.status(HTTP_STATUS_CODE.OK).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
