import React, { useState } from 'react';
import { News } from '../types/New';
import "../App.css";
import { format } from 'date-fns';

interface NewsCardProps {
  news: News;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardStyle: React.CSSProperties = {
    maxWidth: '18rem',
    margin: '1rem',
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{marginTop:"100px"}} className="col-md-4 mb-4">
      <div className="card bg-light" style={cardStyle}>
        <div className="card-header">Haber ID: {news.id}</div>
        <div className="card-body">
          <h5 className="card-title">{news.topic}</h5>
          <p className="card-text">
            {isExpanded ? news.content : `${news.content.slice(0, 200)}...`}
            <button type="button" className="btn btn-link p-0" onClick={handleReadMore}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </p>
          <p className="card-text text-muted">Geçerlilik Tarihi: {format(news.dateOfValidity, 'dd-MM-yyyy')}</p>
        </div>
        <div className="card-footer bg-transparent border-0 text-center">
          <button type="button" className="btn btn-info me-2" onClick={() => onUpdate(news.id)}>Güncelle</button>
          <button type="button" className="btn btn-light" onClick={() => onDelete(news.id)}>Sil</button>
        </div>
      </div>
      
    </div>
  );
};

export default NewsCard;
