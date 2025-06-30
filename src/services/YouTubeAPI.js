const YOUTUBE_API_KEY = 'AIzaSyAj-jbWMTmEyUulesdRb_kugEypKGlkUf8'; // Get from Google Cloud Console
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchYouTubeVideos = async (query, maxResults = 5) => {
  try {
    const response = await fetch(
      `${YOUTUBE_BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) throw new Error('YouTube API error');
    
    const data = await response.json();
    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};