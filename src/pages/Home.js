import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from './imageHelper';
const AiwithImage = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyCehUjmXlMdUUmYh8M397XRYBHPJbdOr3k');

  const [image, setImage] = useState('');
  const [imageInlineData, setImageInlineData] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // New state to control style visibility
  const [fileSelected, setFileSelected] = useState(false); // State to track file selection
  const [healthFilter, sethealthFilter] = useState(true);

  async function aiImageRun() {
    if (fileSelected) {
      setLoading(true);
      setResponse('');
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const result = await model.generateContent([
        "'Gemini, your task is to identify whether the image that is provided is of a fish or not. If you can not find any fish then reply \'No fish detected !! Try another image\'. If its a fish then do not reply anything like fish detected, rather identify if the fish is healthy or not. If the fish is healthy then reply \'Healthy fish\'. If the fish is not healthy and seems abnormal,then do not reply that the fish is not normal or healthy or seems abnormal, rather try to figure out what are the diseases, deficiencies, or decay that is causing the abnormality in the fish, and reply the exact name of the disease or deficiency that you found, do not reply the explanation of the disease or do not reply with any extra text just reply the name of the disease or deficiency. Another big point is I strictly do not want any text like fish detected'", imageInlineData
      ]);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
      console.log(aiResponse);
      setLoading(false);
      setShowResponse(true); // Show response after successful fetch
      if((text) === 'Healthy fish'){
        sethealthFilter(false);
      }
    } else {
      setResponse('No file detected. Please select an image.');
      setFileSelected(false); // Reset fileSelected state
      setShowResponse(true); // Show the "no file detected" message
    }
  }

  const handleImageChange = (e) => {
    setFileSelected(true); // Indicate that a file has been selected
    const file = e.target.files[0];

    // getting base64 from file to render in DOM
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch(e => console.log(e));

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const [aiResponseText, setResponseText] = useState('');
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState(false);
  const [showResponseText, setShowResponseText] = useState(false); // New state to control style visibility
    async function fetchResponse() {
      try {
        setLoadingText(true);
        const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `provide three precautionary measures to prevent "${aiResponse}" fish disease.`;
        const result = await model2.generateContent(prompt);
        const textResponse = await result.response;
        const text2 = textResponse.text();
        setResponseText(text2);
        setLoadingText(false);
        setShowResponseText(true);
      } catch (error) {
        setError(error);
        setShowResponseText(false);
      }
    }
  const handleClick = () => {
    aiImageRun();
  }

  const finalClick = () => {
    fetchResponse();
  }

  return (
    <div style={{  width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'}}>
      <h1 style={{color:'#333333', fontFamily: 'sans-serif'}}>FISH DOC</h1>
      <h4 style={{color:'#333333'}}>Generative AI Fish Disease Detector App! ❤️</h4>
      <div style={{display: 'flex',flexDirection: 'row', margin: '30px 0px', gap: '20px', alignItems: 'center', justifyContent: 'center', gap:'20px'}}>
      <p style={{fontSize: '20px',fontStyle: 'oblique',fontWeight: '600'}}>Enter image file that contains picture of fish to check for disease.</p>
      </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <input type='file' onChange={(e) => handleImageChange(e)} />
            <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
          </div>
          <img src={image} style={{ marginTop: '30px', backgroundColor: '#e2e2e2', maxWidth: '40%', borderRadius: '15%', boxShadow: '0px 0px 11px -1px #333333', maxHeight: '40%', objectFit: 'contain' }} />
        </div>
        {loading === true && aiResponse === '' ? (
          <p style={{ margin: '30px 0' }}>Loading ...</p>
        ) : showResponse && ( // Only show response if fetched and showResponse state is true
          <div style={{ margin: '30px 10', margin: '2%', padding: '2%', backgroundColor: '#f6f3f3', borderRadius: '15px', boxShadow: '0px 0px 20px 0px #adadad' }}>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '20px 0'}}>
          {
            showResponse && healthFilter &&(
              aiResponse === "Healthy fish" ? (
              <button  onClick={() => finalClick()}>Get Cure</button>) : (
              <button  onClick={() => finalClick()}>Get tips to keep the fish healthy</button>
              )
            )
          }
        </div>
        {
          loadingText === true && aiResponseText === '' ?(
          <p style={{ margin: '30px 0' }}>Loading ...</p>
          ) :
        showResponseText && ( // Only show response if fetched and showResponse state is true
          <div style={{ margin: '30px 10', margin: '2%', padding: '2%', backgroundColor: '#f6f3f3', borderRadius: '15px', boxShadow: '0px 0px 20px 0px #adadad' }}>
            <p>{aiResponseText}</p>
          </div>
        )}
      </div>
  );
};


export default AiwithImage;
