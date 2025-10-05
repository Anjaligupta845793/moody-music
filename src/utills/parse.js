export function parseMusicData(responseText) {
  try {
   
    if (typeof responseText !== 'string') {
        throw new Error('Response from AI was not a string.');
    }
    
    let cleanedText = responseText.trim();
    
   
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```json?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }
       
    const firstBracket = cleanedText.lastIndexOf('['); 
    const lastBracket = cleanedText.lastIndexOf(']');
    
    if (firstBracket === -1 || lastBracket === -1 || lastBracket < firstBracket) {
      throw new Error('No valid JSON array found in the AI response.');
    }
    
    const jsonString = cleanedText.substring(firstBracket, lastBracket + 1);
    
    
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
      throw new Error('No valid songs found in the parsed data');
    }
    
    return validSongs;
    
  } catch (error) {
    console.error('Failed to parse music data:', error);
    console.log('Raw response that failed parsing:', responseText); 
    
    return []; 
  }
}