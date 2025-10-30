import { NextFunction, Request, Response } from "express";
import client from "prom-client";

// Define the counter metric
const requestCounter = new client.Counter({
  name: "request_count",
  help: "Total number of HTTP requests",
  labelNames: ["Method", "Route", "StatusCode"] as const,
});

// Middleware to count requests
export function requestCountMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`${req.method} ${req.originalUrl} took ${endTime - startTime}ms`);

    requestCounter.inc({
      Method: req.method,
      Route: req.route?.path || req.path,
      StatusCode: res.statusCode,
    });
  });

  next();
}
