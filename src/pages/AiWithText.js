// import React, { useState, useEffect } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const AiWithText = () => {
//   const genAI = new GoogleGenerativeAI('AIzaSyCehUjmXlMdUUmYh8M397XRYBHPJbdOr3k');

//   const [aiResponseText, setResponseText] = useState('');
//   const [Textloading, setTextLoading] = useState(true); // Start with loading state
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchResponse() {
//       try {
//         const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const prompt = `Gemini, for the fish disease "example-disease", provide three precautionary measures to prevent or manage the disease. These measures should be concise, clear, and limited to one sentence each. No additional information or context is needed—only the three precautions in bullet-point format. But if the plant disease is 'healthy fish' then must reply 'No need to worry. The Fish seems healthy' else if the plant disease is 'No fish detected !! Try another image' then must reply 'No fish detected in the image'`;
//         const result = await model2.generateContent(prompt);
//         const textResponse = await result.response;
//         const text2 = textResponse.text();
//         setResponseText(text2);
//         setTextLoading(false);
//       } catch (error) {
//         setError(error);
//         setTextLoading(false);
//       }
//     }
//     fetchResponse();
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', alignItems: 'center', justifyContent: 'center' }}>
//       {Textloading && <p style={{ margin: '30px 10' }}>Loading ...</p>}
//       {error && <p style={{ margin: '30px 10' }}>Error: {error.message}</p>}
//       {!Textloading && !error && (
//         <div style={{ margin: '30px 10', margin: '2%', padding: '2%', backgroundColor: '#f6f3f3', borderRadius: '15px', boxShadow: '0px 0px 20px 0px #adadad' }}>
//           <p>{aiResponseText}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AiWithText;