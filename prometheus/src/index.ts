import express from "express";
import { requestCountMiddleware } from "./monitoring/requestCount.js";
import client from "prom-client";
const app = express();

app.use(requestCountMiddleware);

app.get("/user", (req, res) => {
  res.json({ name: "keshav" });
});

app.get("/metrics", async (req, res) => {   
    const metrices = await client.register.metrics();
    res.setHeader("Content-Type", client.register.contentType);
    res.send(metrices);
})

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
