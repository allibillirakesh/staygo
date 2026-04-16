// Health check endpoint
// netlify/functions/health.js

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: '✅ StayGo Backend Running on Netlify',
        timestamp: new Date().toISOString(),
        platform: 'Netlify Functions',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
