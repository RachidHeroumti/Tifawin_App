import axios from 'axios';

const sendTwitterPixelEvent = async () => {
  const pixelId = 'YOUR_TWITTER_PIXEL_ID';
  const apiKey = 'YOUR_TWITTER_API_KEY';

  const payload = {
    event: 'PageView', 
    pixel_id: pixelId,
    timestamp: new Date().toISOString(),
    user_data: {
      email: 'hashed_email@example.com', 
    },
  };

  try {
    const response = await axios.post(
      'https://ads-api.twitter.com/i/conversion_event',
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Twitter Pixel Event Sent:', response.data);
  } catch (error) {
    console.error('Error sending Twitter Pixel Event:', error);
  }
};

useEffect(() => {
  sendTwitterPixelEvent();
}, []);
