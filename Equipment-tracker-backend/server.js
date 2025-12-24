const express = require("express");
const cors = require("cors");

const equipmentRoutes = require("./routes/equipmentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/equipment", equipmentRoutes);

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
