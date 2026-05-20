import React, { createContext, useState, useEffect, useCallback } from 'react';
import { newsData as mockNewsData } from '../data/newsData';

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

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_URL = 'https://newsdata.io/api/1/news?apikey=pub_f64a32c0b8d54f9190702bda4c10279a&country=in&language=hi&removeduplicate=1';

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
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success" && data.results && data.results.length > 0) {
        const mappedArticles = data.results.map((item, index) => mapApiArticle(item, index));
        setNews(mappedArticles);
        setLastUpdated(new Date());
      } else {
        throw new Error("No news results returned from API");
      }
    } catch (err) {
      console.warn("News API failed or limit reached, falling back to mock data. Error:", err.message);
      setError(err.message);
      // Fallback: Map the mock data to include necessary attributes and set as current news
      setNews(mockNewsData);
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [mapApiArticle]);

  // Initial load
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <NewsContext.Provider value={{ news, loading, error, lastUpdated, refreshNews: fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};
