import Record from "../models/Record.js";
import Agent from "../models/Agent.js";
import csv from "csv-parser";
import fs from "fs";

export const uploadRecords = async (req, res) => {
  try {
    const agents = await Agent.find();
    if (agents.length === 0) return res.status(400).json({ message: "No agents available" });

    let agentIndex = 0;
    const results = [];

    fs.createReadStream(req.file.path) //Reading the CSV file
      .pipe(csv()) //parser
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (let i = 0; i < results.length; i++) {
          const agent = agents[agentIndex];
          await Record.create({
            name: results[i].name,
            phone: results[i].phone,
            assignedTo: agent._id,
          });
          agentIndex = (agentIndex + 1) % agents.length;
        }
        res.json({ message: "Records distributed successfully" });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


