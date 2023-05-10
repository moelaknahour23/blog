import React, { useState, useEffect } from 'react';
import { LatestNewsCard } from '../components';
import { getRecentNews } from '../services';

const LatestNews=() => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    getRecentNews().then((result) => {
      setLatestNews(result);
    });
  }, []);


  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        { latestNews.slice().reverse().map((news, index) => (
          <LatestNewsCard key={index} newsItem={news.node} />
          ))}
    </div>
  );
};

export default LatestNews;