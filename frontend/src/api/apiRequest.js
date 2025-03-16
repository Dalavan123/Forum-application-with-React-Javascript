export const apiRequest = async (
  url,
  options = {},
  errorMessage = 'API request failed'
) => {
  try {
    console.log(`🔍 Fetching: ${url}`, options); // ✅ Debugging API call
    const response = await fetch(url, options);

    if (!response.ok) {
      const errText = `${errorMessage} (HTTP ${response.status} ${response.statusText})`;
      console.error('❌ API Error:', errText);
      throw new Error(errText);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      console.log('✅ API Response:', data); // ✅ Log response
      return data;
    }

    console.warn('⚠️ Response was not JSON.');
    return null;
  } catch (error) {
    console.error('❌ API Request Failed:', error);
    throw error;
  }
};
