import React, { createContext, useState, useEffect, useCallback } from 'react';
import { newsData as mockNewsData } from '../data/newsData';
import { API_BASE_URL } from '../services/api';

export const NewsContext = createContext();

export const apiCategoryMap = {
  top: "मुख्य समाचार",
  politics: "राजनीति",
  business: "व्यापार",
  sports: "खेल",
  technology: "तकनीक",
  science: "विज्ञान",
  entertainment: "मनोरंजन",
  health: "स्वास्थ्य",
  world: "विश्व समाचार",
  domestic: "देश - प्रदेश",
  environment: "पर्यावरण",
  other: "अन्य"
};

// Local Storage Helpers for Custom Articles
const getLocalArticles = () => {
  try {
    const stored = localStorage.getItem('tm24_custom_articles');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error reading localStorage:", e);
    return [];
  }
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const API_URL = 'https://newsdata.io/api/1/news?apikey=pub_f64a32c0b8d54f9190702bda4c10279a&country=in&language=hi&removeduplicate=1';

  // Helper to merge local articles with fetched articles
  const mergeArticles = useCallback((fetchedArticles) => {
    const localArticles = getLocalArticles();
    const filteredLocal = localArticles.filter(
      la => !fetchedArticles.some(fa => String(fa.id) === String(la.id))
    );
    return [...filteredLocal, ...fetchedArticles];
  }, []);

  const mapApiArticle = useCallback((item, index) => {
    let mappedCategory = "अन्य";
    if (item.category && item.category.length > 0) {
      const firstCat = item.category[0].toLowerCase();
      mappedCategory = apiCategoryMap[firstCat] || firstCat.charAt(0).toUpperCase() + firstCat.slice(1);
    }

    let formattedDate = item.pubDate || "आज";
    try {
      const dateObj = new Date(item.pubDate);
      if (!isNaN(dateObj.getTime())) {
        const months = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
        formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
      }
    } catch (e) {
      // Keep fallback
    }

    return {
      id: item.article_id || `api-${index}`,
      title: item.title,
      description: item.description || "इस खबर के बारे में अधिक विवरण उपलब्ध नहीं है।",
      content: (item.content && item.content !== "ONLY AVAILABLE IN PAID PLANS") 
        ? item.content 
        : (item.description || "इस खबर से जुड़ी अन्य महत्वपूर्ण जानकारियां भी जल्द ही साझा की जाएंगी।"),
      category: mappedCategory,
      image: item.image_url || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      author: item.creator && item.creator.length > 0 ? item.creator[0] : (item.source_name || "संपादक"),
      date: formattedDate,
      trending: item.category?.includes("top") || index < 4,
      breaking: item.category?.includes("top") || index < 2,
      link: item.link
    };
  }, []);

  const fetchNews = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);
    
    // Check custom backend configurations
    const savedBackendUrl = API_BASE_URL; // or localStorage.getItem('tm24_backend_url')
    const isSimMode = localStorage.getItem('tm24_use_simulation') === 'true';

    let dbArticles = [];
    let apiArticles = [];

    // 1. Fetch from MongoDB Backend (if not in Simulation Mode)
    if (!isSimMode) {
      try {
        const dbResponse = await fetch(`${savedBackendUrl}/news`);
        if (dbResponse.ok) {
          const dbData = await dbResponse.json();
          dbArticles = dbData.map(art => ({
            ...art,
            id: art._id || art.id,
            isRichContent: true
          }));
        } else {
          console.warn(`DB Server returned error status ${dbResponse.status}`);
        }
      } catch (dbErr) {
        console.warn("Backend server not connected. Skipping DB articles. Reason:", dbErr.message);
      }
    }

    // 2. Fetch from newsdata.io API
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success" && data.results && data.results.length > 0) {
          apiArticles = data.results.map((item, index) => mapApiArticle(item, index));
        } else {
          throw new Error("No news results returned from newsdata.io API");
        }
      } else {
        throw new Error(`newsdata.io API returned status ${response.status}`);
      }
    } catch (apiErr) {
      console.warn("newsdata.io API fetch failed, falling back to mock news. Reason:", apiErr.message);
      // Fallback: use mock news data + local storage simulated database published articles
      const simulatedDb = JSON.parse(localStorage.getItem('tm24_simulated_db') || '[]');
      const publishedSim = simulatedDb.filter(item => item.published === true);
      apiArticles = [...publishedSim, ...mockNewsData];
    }

    // 3. Merge everything: DB news + API/Mock news
    const combinedNewsList = [...dbArticles, ...apiArticles];
    
    // Merge with localStorage custom articles (using mergeArticles helper to prevent duplicates)
    const finalMergedNews = mergeArticles(combinedNewsList);

    setNews(finalMergedNews);
    setLastUpdated(new Date());
    if (showLoader) setLoading(false);
  }, [mapApiArticle, mergeArticles]);

  const addArticle = useCallback((newArticle) => {
    try {
      const localArticles = getLocalArticles();
      const updated = [newArticle, ...localArticles];
      localStorage.setItem('tm24_custom_articles', JSON.stringify(updated));
      setNews(prev => {
        const filtered = prev.filter(p => String(p.id) !== String(newArticle.id));
        return [newArticle, ...filtered];
      });
    } catch (e) {
      console.error("Failed to save article to localStorage:", e);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <NewsContext.Provider value={{ news, loading, error, lastUpdated, refreshNews: fetchNews, addArticle, isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </NewsContext.Provider>
  );
};
