const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/productos', async (req, res) => {
  try {
    const results = await db.productos();
    const pages = req.query.page;
    res.json(paginatedResults(pages, results));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/productos/search', async (req, res) => {
  try {
    const results = await db.search(req.query.search);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/productos/categorias', async (req, res) => {
  try {
    const results = await db.categories();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/productos/category', async (req, res) => {
  try {
    const results = await db.selectCategory(req.query.category);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

function paginatedResults (pages, model) {
  const page = pages;
  const limit = 12;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < model.length) {
    results.next = {
      page: parseInt(page) + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  results.results = model.slice(startIndex, endIndex);
  return results;
}

module.exports = router;
