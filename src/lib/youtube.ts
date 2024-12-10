export const getYouTubeVideoInfo = async (videoId: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const { title, description } = data.items[0].snippet;
      return {
        title,
        description,
        success: true
      };
    }
    
    return {
      title: '',
      description: '',
      success: false
    };
  } catch (error) {
    console.error('Error fetching YouTube video info:', error);
    return {
      title: '',
      description: '',
      success: false
    };
  }
};

export const getYouTubeVideoId = (url: string) => {
  // 處理一般 YouTube URL
  const normalMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (normalMatch) return normalMatch[1];

  // 處理 YouTube Shorts URL
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^&\n?#]+)/);
  if (shortsMatch) return shortsMatch[1];

  return null;
}; 