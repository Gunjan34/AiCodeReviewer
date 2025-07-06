const express = require("express");
const  connectionDb  = require("./db");
const userRouter = require("./routes/userRoute");
const aiRouter = require("./routes/aiRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
connectionDb();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/ai",aiRouter);

 const PORT = 2000; 
 app.listen(PORT,()=>{
  console.log(`Server is listening in PORT ${PORT}`);
 })