
export function parseMusicData(responseText) {
  try {
    // Remove markdown code blocks if present
    let cleanedText = responseText.trim();
    
    // Remove ```json or ``` wrapping
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```json?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }
    
    // Find the first [ and last ] to extract just the JSON array
    const firstBracket = cleanedText.indexOf('[');
    const lastBracket = cleanedText.lastIndexOf(']');
    
    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error('No JSON array found in response');
    }
    
    const jsonString = cleanedText.substring(firstBracket, lastBracket + 1);
    
    // Parse the JSON
    const musicData = JSON.parse(jsonString);
    
    // Validate the data structure
    if (!Array.isArray(musicData)) {
      throw new Error('Parsed data is not an array');
    }
    
    // Validate each song object
    const validSongs = musicData.filter(song => 
      song.title && song.artist && song.genre && song.reason
    );
    
    if (validSongs.length === 0) {
      throw new Error('No valid songs found in the data');
    }
    
    return validSongs;
    
  } catch (error) {
    console.error('Failed to parse music data:', error);
    console.log('Raw response:', responseText); // Log for debugging
    throw error;
  }
}