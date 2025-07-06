// import React, { useEffect, useState } from "react";
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import "prismjs/components/prism-javascript"; // important!
// import axios from "axios"
// import "./Home.css";

// const Home = () => {
//   const [code, setCode] = useState(`function sum() {
//   return 1 + 1;
// }`);

// const[review,setReview] = useState(``);

// useEffect(()=>{
//   prism.highlightAll()
// },[]);

// async function reviewCode() {
//   try {
//     const response = await axios.post("http://localhost:2000/ai/get-review", {
//       prompt: code, // send the actual code as the prompt
//     });
//     setReview(response.data);
//   } catch (err) {
//     console.error("Error during code review:", err.response?.data || err.message);
//   }
// }

// return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={(code) => setCode(code)}
//               highlight={(code) =>
//                 prism.highlight(code, prism.languages.javascript, "javascript")
//               }
//               padding={10}
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 16,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 color: "#fff", 
//                 width: "100%",
//               }}
//             />
//           </div>
//           <div onClick={reviewCode} className="review">Review</div>
//         </div>
//         <div className="right">
//         {review}</div>
//       </main>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import "prismjs/components/prism-javascript";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Home.css";

const Home = () => {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:2000/ai/get-review", {
        prompt: code,
      });

      // Safely handle response object
      if (response.data?.message) {
        setReview(response.data.message);
      } else {
        setReview(JSON.stringify(response.data, null, 2));
      }
    } catch (err) {
      console.error("Error during code review:", err.response?.data || err.message);
      setReview("Something went wrong during review.");
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              color: "#fff",
              width: "100%",
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">Review</div>
      </div>
      <div className="right"    
   style={{
    padding: "1rem",
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    overflowY: "auto",
    overflowX: "hidden", // 👈 Important
    maxHeight: "90vh",
    border: "1px solid #444",
    borderRadius: "5px",
    marginLeft: "1rem",
    width: "100%",
    wordBreak: "break-word", // 👈 Important
    whiteSpace: "pre-wrap",  // 👈 Important
  }}>
        {/* <pre style={{ whiteSpace: "pre-wrap", color: "#fff" }}></pre> */}
    
        <Markdown
       rehypePlugins={[rehypeHighlight]}
        >{review}</Markdown>
      </div>
    </main>
  );
};

export default Home;
