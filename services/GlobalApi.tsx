const INNGEST_SERVER_URL = process.env.NEXT_PUBLIC_INNGEST_SERVER_URL || 'http://127.0.0.1:8288';

export const RunStatus = async (eventId: string) => {

  const url = `${INNGEST_SERVER_URL}/v1/events/${eventId}/runs`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    
    if (json.data && json.data.length > 0) {
      const run = json.data[0];
      
      return run; 
    } else {
      console.log("⏳ No runs found yet, still processing...");
      return null; 
    }
    
  } catch (error) {
    console.error("❌ Error in RunStatus:", error);
    throw error;
  }
};
