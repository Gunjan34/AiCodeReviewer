 const aiService = require("../services/ai.service");
const getReview = async (req, res) => {
  console.log("Request body:", req.body); // For debugging

  const prompt = req.body.prompt;
  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await aiService(prompt.trim()); 
    res.status(200).json({ success:true, message: response });
  } catch (error) {
    console.error("Error in AI response:", error.message);
    res.status(500).json({ success: false, message: "AI request failed" });
  }
};



 module.exports = getReview



// const getResponse = async (req, res) => {
//   try {
//     const prompt = req.query.prompt || "Hello, AI!";
//     const aiResponse = await aiService(prompt);
//     res.status(200).json({ success: true, message: aiResponse });
//   } catch (error) {
//     console.error("Error in AI response:", error.message);
//     res.status(500).json({ success: false, message: "AI request failed" });
//   }
// };


// module.exports=getResponse;
