const express = require("express");
const app = express();
const cors = require("cors");
const mongoDb = require("./Models/db");
const UserModel = require("./Models/User");
const PORT = 8500;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
mongoDb();


app.get("/ankit", (req, res) => {
  res.send("Heloo Ankit  chole wala");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: `${err}Internal server errror`,
      success: false,
    });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    // Placeholder response; hook into email service for production.
    return res.status(200).json({
      message: "If an account exists, a reset link has been sent to the email provided.",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errorMsg = 'Auth failed email or password is wrong';
      if (!user) {
        return res.status(403)
          .json({ message: errorMsg, success: false });
      }
      
      
    
    
      
      res.status(200)
        .json({
          message: "Login Success",
          success: true,
          email,
          name: user.name
        });
    } catch (err) {
      res.status(500)
        .json({
          message: "Internal server errror",
          success: false
        });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
