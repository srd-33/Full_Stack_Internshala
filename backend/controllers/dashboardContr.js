import Agent from "../models/Agent.js";   
import Record from "../models/Record.js"; 

export const getDashboardStats = async (req, res) => {
  try {
    const totalAgents = await Agent.countDocuments();
    const totalRecords = await Record.countDocuments();

    const recordsPerAgent = await Record.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          count: { $sum: 1 },
          records: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "agents",        
          localField: "_id",     
          foreignField: "_id",   
          as: "agent",
        },
      },
      {
        $unwind: {
          path: "$agent",
          preserveNullAndEmptyArrays: true, 
        },
      },
    ]);

    res.json({
      totalAgents,
      totalRecords,
      recordsPerAgent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


