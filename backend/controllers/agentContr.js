import Agent from "../models/Agent.js";

export const getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};

export const addAgent = async (req, res) => {
  const { name, email } = req.body;
  const newAgent = new Agent({ name, email });
  await newAgent.save();
  res.json(newAgent);
};
