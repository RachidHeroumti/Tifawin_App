import axios from "axios";

let TIKTOK_ACCESS_TOKEN = "YOUR_TIKTOK_ACCESS_TOKEN"; 
let PIXEL_ID = "YOUR_PIXEL_ID"; 

export const initialTicTok =(tiktoktoken:string,pxelid:string)=>{
TIKTOK_ACCESS_TOKEN=tiktoktoken;
PIXEL_ID=pxelid
}
export const sendTikTokEvent = async (eventName:string, eventData:any) => {
  const url = "https://business-api.tiktok.com/open_api/v1.2/pixel/track/";

  const payload = {
    pixel_code: PIXEL_ID,
    event: eventName, 
    event_id: new Date().getTime().toString(), 
    timestamp: new Date().toISOString(),
    context: {
      user: {
        external_id: ["USER_ID_HASHED"],
        phone_number: ["HASHED_PHONE"], 
      },
      page: {
        url: "https://yourwebsite.com", // Required for web-based events
        referrer: "https://yourwebsite.com",
      },
      ip: "USER_IP_ADDRESS", 
      user_agent: "USER_BROWSER_USER_AGENT", 
    },
    properties: eventData,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Token": TIKTOK_ACCESS_TOKEN,
      },
    });

    console.log("TikTok Event Sent:", response.data);
  } catch (error) {
    console.error("TikTok Pixel Error:", error.response?.data || error.message);
  }
};
