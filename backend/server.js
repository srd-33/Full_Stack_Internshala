import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import agentRoutes from "./routes/agentRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serverless from "serverless-http";

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5000",  
   "http://localhost:5173",               // local dev
  "https://full-stack2-frontend2.vercel.app" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS"
}));

// Routes
app.use("/api/agents", agentRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is working 🚀" });
});

app.use(notFound);

app.use(errorHandler);

// Export for serverless
export const handler = serverless(app);

// Run normally if local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}
