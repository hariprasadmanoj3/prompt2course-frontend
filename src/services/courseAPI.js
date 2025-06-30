// Using JSONPlaceholder as a mock API for demo purposes
const MOCK_API_BASE = 'https://jsonplaceholder.typicode.com';

export const generateCourseContent = async (topic) => {
  try {
    // For demo, we'll create rich content based on the topic
    const courseContent = {
      title: `Complete Guide to ${topic}`,
      description: `Master ${topic} with this comprehensive course designed for all skill levels.`,
      modules: [
        {
          title: `Introduction to ${topic}`,
          lessons: [
            `What is ${topic}?`,
            `History and Evolution of ${topic}`,
            `Why Learn ${topic}?`,
            `Setting Up Your Environment`
          ]
        },
        {
          title: `${topic} Fundamentals`,
          lessons: [
            `Core Concepts and Principles`,
            `Basic Terminology`,
            `Common Patterns and Practices`,
            `Hands-on Exercises`
          ]
        },
        {
          title: `Advanced ${topic}`,
          lessons: [
            `Advanced Techniques`,
            `Best Practices`,
            `Real-world Applications`,
            `Case Studies`
          ]
        },
        {
          title: `${topic} Projects`,
          lessons: [
            `Project Planning`,
            `Building Your First Project`,
            `Advanced Project Ideas`,
            `Portfolio Development`
          ]
        }
      ],
      resources: [
        `Official ${topic} Documentation`,
        `Community Forums and Support`,
        `Additional Learning Resources`,
        `Certification Paths`
      ]
    };

    return courseContent;
  } catch (error) {
    console.error('Error generating course content:', error);
    return null;
  }
};

// Free alternative APIs you can use:
export const FREE_APIS = {
  // Wikipedia API for educational content
  wikipedia: 'https://en.wikipedia.org/api/rest_v1/page/summary/',
  
  // Quotable API for motivational quotes
  quotes: 'https://api.quotable.io/random',
  
  // REST Countries API for geography courses
  countries: 'https://restcountries.com/v3.1/all',
  
  // JSONPlaceholder for mock data
  mockData: 'https://jsonplaceholder.typicode.com',
  
  // News API (requires registration but has free tier)
  news: 'https://newsapi.org/v2/everything',
};