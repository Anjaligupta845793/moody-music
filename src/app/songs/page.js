"use client"
import React, { useState ,useEffect} from 'react';
import { parseMusicData } from '@/utills/parse';

const Page = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [musicData, setmusicData] = useState([])

 
 useEffect(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("apiData");
    
    if (!stored) {
      console.error('No data found');
      return;
    }

    try {
      
      
    
      const parsed = JSON.parse(stored);
      
      console.log('Parsed data:', parsed);
      console.log('Is array?', Array.isArray(parsed));
      
      setmusicData(parsed);
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  }
}, []);

 

  const getGenreColor = (genre) => {
    const colors = {
      'R&B/Pop': 'bg-purple-100 text-purple-800',
      'Pop/Electronic': 'bg-blue-100 text-blue-800',
      'Rock/Funk': 'bg-red-100 text-red-800',
      'Dance/Electronic': 'bg-green-100 text-green-800',
      'Pop/Rock': 'bg-orange-100 text-orange-800',
      'Rock/Alternative': 'bg-gray-100 text-gray-800',
      'Indie/Pop': 'bg-pink-100 text-pink-800'
    };
    return colors[genre] || 'bg-gray-100 text-gray-800';
  };

  const handlePlay = (index) => {
    setPlayingIndex(index);
    setTimeout(() => {
      setPlayingIndex(null);
    }, 3000);
  };

  const toggleFavorite = (index) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(index)) {
        newFavorites.delete(index);
      } else {
        newFavorites.add(index);
      }
      return newFavorites;
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎵 Moody Playlist</h1>
          <p className="text-lg text-gray-600">Songs to keep you focused and energized</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicData && musicData.map((song, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{song.title}</h3>
                  <p className="text-gray-600 font-medium mb-3">{song.artist}</p>
                </div>
                <div className="ml-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGenreColor(song.genre)}`}>
                    {song.genre}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed italic">{song.reason}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => handlePlay(index)}
                  className={`flex items-center space-x-2 ${
                    playingIndex === index 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-600'
                  } text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium`}
                >
                  {playingIndex === index ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <span>Playing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                      </svg>
                      <span>Play</span>
                    </>
                  )}
                </button>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleFavorite(index)}
                    className={`p-2 ${
                      favorites.has(index) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    } transition-colors duration-200`}
                    title="Add to favorites"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill={favorites.has(index) ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200" 
                    title="More options"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;