import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user-route.js";
import gigRoute from "./routes/gig-route.js";
import orderRoute from "./routes/order-route.js";
import conversationRoute from "./routes/conversation-route.js";
import messageRoute from "./routes/message-route.js";
import reviewRoute from "./routes/review-route.js";
import authRoute from "./routes/auth-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 8800;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// app.use(cors());
// // Set additional headers
// app.all('http://localhost:5173', function (req, res) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace '*' with your allowed origin(s)
//     res.header('Access-Control-Allow-Credentials', true); // Allow credentials
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     // ... other headers as needed
//     next();
// });

// app.use((req, res, next) => {
//   res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
//   next();
// });

// app.use(cors({
//   origin: 'http://localhost:5173/', // Replace with your client's origin
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'X-AccessToken','Authorization']
// }));

// Use to use this one 
app.use(cors({
  origin: '*',//['http://localhost:5173','https://freelancerwebapp.netlify.app'],// Replace with your client's origin
  // credentials: true,
  methods: ['GET', 'HEAD','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','Origin'] //"*"
}));

// app.use(cors({ origin: '*'}));
// app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
// app.use(cors({ origin: 'http://netlify.app.com', credentials: true })); 
// app.use(cors({ origin: 'https://freelancer-fullstack.netlify.app', credentials: true })); 
// app.use(cors());
// app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
connect();

app.get("/", (req, res) => {
  res.send("Hello Freelancers");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status //|| 500;
  const errorMessage = err.message //|| "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  console.log("Backend server is running!");
});
