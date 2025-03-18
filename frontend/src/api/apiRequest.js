/*Hanterar API requests i en användbar sätt för frontend.
Istället för att skriva `fetch()` i alla komponenter, använder vi denna funktion.
Hanterar även felloggning*/

export const apiRequest = async (
  url,
  options = {},
  errorMessage = 'API request failed'
) => {
  try {
    console.log(`🔍 Fetching: ${url}`, options); // Loggar API
    const response = await fetch(url, options);

    if (!response.ok) {
      const errText = `${errorMessage} (HTTP ${response.status} ${response.statusText})`;
      console.error('❌ API Error:', errText);
      throw new Error(errText);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      console.log('✅ API Response:', data); // Loggar respons
      return data;
    }

    console.warn('⚠️ Response was not JSON.');
    return null;
  } catch (error) {
    console.error('❌ API Request Failed:', error);
    throw error;
  }
};
