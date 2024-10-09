import express from "express";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import xss from "xss-clean";
import morgan from "morgan";
import {errorHandler} from "./utils/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
// Rate limiting: Limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// HTTP request logger
app.use(morgan("combined"));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Custom middleware to add request timestamp and log headers
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

//ROUTE HANDLERS
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

export default app;




