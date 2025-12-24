const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const router = express.Router();
const dataFile = path.join(__dirname, "../data/equipment.json");

const readData = () => JSON.parse(fs.readFileSync(dataFile));
const writeData = (data) =>
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

/**
 * GET all equipment
 */
router.get("/", (req, res) => {
  res.json(readData());
});

/**
 * POST new equipment
 */
router.post("/", (req, res) => {
  const equipment = readData();
  const newItem = { id: uuid(), ...req.body };
  equipment.push(newItem);
  writeData(equipment);
  res.status(201).json(newItem);
});

/**
 * PUT update equipment
 */
router.put("/:id", (req, res) => {
  const equipment = readData();
  const index = equipment.findIndex(e => e.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Equipment not found" });
  }

  equipment[index] = { ...equipment[index], ...req.body };
  writeData(equipment);
  res.json(equipment[index]);
});

/**
 * DELETE equipment
 */
router.delete("/:id", (req, res) => {
  const equipment = readData();
  const updated = equipment.filter(e => e.id !== req.params.id);

  writeData(updated);
  res.status(204).end();
});

module.exports = router;
