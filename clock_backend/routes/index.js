var express = require("express");
var router = express.Router();
const Item = require("../models/Item");

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST/create a new timer */
router.post("/", async function (req, res) {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* PUT/update a new timer */
router.put("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const item = await Item.findOneAndUpdate(
      { uuid },
      { $set: { activeDuration: req.body.time } }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* Delete a timer */
router.delete("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const currentDate = new Date();
    const deletedItem = await Item.findOneAndUpdate(
      { uuid },
      { $set: { deleteDate: currentDate } },
      { new: true }
    );

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
