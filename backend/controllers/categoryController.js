const Category = require("../models/categoryModel");

// to post category:
// req: user baata, res: server baata aune result.
exports.postCategory = async (req, res) => {
  let category = new Category({
    category_name: req.body.category_name, // variable ko name ho hai req.body paxiko.
  });
  // dynamic hune vayekale let, naya data chaine vayekale new, value jahile ni object maa hune vayekale {}.

  // check for unique data:
  Category.findOne({ category_name: category.category_name }).then(
    async (categories) => {
      if (categories) {
        return res.status(400).json({ error: "Category must be unique." });
      } else {
        category = await category.save();
        if (!category) {
          return res.status(400).json({ error: "Something went wrong..." });
        }
        res.send(category);
      }
    }
  )
  .catch(err=>res.status(400).json({error:err}))
};

// to show all category.
exports.categoryList = async (req, res) => {
  const category = await Category.find();
  if (!category) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
  res.send(category);
};

// to show single data
exports.categoryDetails = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
  res.send(category);
};

// update category.
exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      category_name: req.body.category_name,
    },
    { new: true } // jun update vako xa tyai aaune banauna.
  );
  if (!category) {
    return res.status(400).json({ error: "Something went wrong..." });
  }
  res.send(category);
};

// delete category
exports.deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (!category) {
        return res
          .status(400)
          .json({ error: "Category with that id no found." });
      } else {
        return res.status(200).json({ message: "Category deleted." });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
