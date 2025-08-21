import express from "express";
import multer from "multer";
import { uploadRecords } from "../controllers/recordController.js";
import Record from "../models/Record.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), uploadRecords);

router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id/assign", async (req, res) => {
  const { agentId } = req.body;
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { assignedTo: agentId },
      { new: true }
    );
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
