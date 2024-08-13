import React, { useEffect, useState } from 'react';
import EventService from '../services/EventService';
import { News } from '../types/New';
import NewsCard from './HaberKart';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const NewsList: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Hata mesajı durumu
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      console.log("");
      const response = await EventService.getAllNewsDetail();
      console.log(response.status);
      console.log(response.data);

      setNewsList(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Kayıtlı Haber Yok');
      } else {
        console.error('Haberler alınırken hata oluştu', error);
        setErrorMessage('Haberler alınırken bir hata oluştu');
      }
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleUpdate = (id: number) => {
    navigate(`/admin/news-update/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Haberi silmek istediğinizden emin misiniz?");
    if (isConfirmed) {
      try {
        await EventService.deleteNew(id);
        fetchNews(); // Haberler silindikten sonra verileri yeniden yükle
      } catch (error) {
        console.error('Haber silinirken hata oluştu', error);
      }
    }
  };

  return (
    <div className="container">
      {errorMessage ? (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      ) : (
        <div className="row">
          {newsList.map((news) => (
            <NewsCard key={news.id} news={news} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
