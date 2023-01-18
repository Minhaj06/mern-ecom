const Category = require("../models/category.js");
const Product = require("../models/product.js");
const validCategory = require("../helpers/category");

const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    // Category validation
    await validCategory(name);

    // const exist

    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
