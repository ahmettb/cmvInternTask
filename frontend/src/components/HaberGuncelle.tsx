import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../services/EventService';
import { News, NewDto } from '../types/New';
import { format } from 'date-fns';
import '../styles/HaberGuncelle.css';

const NewsUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (id) {
        try {
          const response = await EventService.getNewById(Number(id)); 
          setNews(response.data);
        } catch (error) {
          return(<div><h1>Haber Buluanmadı</h1></div>)
        }
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (news) {
      setNews({
        ...news,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (news && id) {
      const updatedDto: NewDto = {
        topic: news.topic,
        content: news.content,
        dateOfValidity: news.dateOfValidity,
        newLink: news.newLink,
      };
      if (!updatedDto.content || !updatedDto.dateOfValidity || !updatedDto.newLink || !updatedDto.topic) {
        setErrorMessage('Lütfen tüm alanları doldurunuz.');
        return;
      }

      try {
        console.log(JSON.stringify(updatedDto));
        await EventService.updateNew(Number(id), updatedDto); 
        setSuccessMessage("Güncelleme İşlemi Başarılı.");
      } catch (error) {
        console.error('Haber güncellenirken hata oluştu', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 style={{ marginTop:"120px", color:"black"}} >Haber Güncelle</h1>
      {news ? (
        <form onSubmit={handleSubmit} className="form-update">
          <div className="mb-3">
            <label style={{color:"black"}}  htmlFor="topic" className="form-label form-title">Başlık:</label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="form-control form-input"
              value={news.topic}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label form-title">İçerik:</label>
            <textarea
              id="content"
              name="content"
              className="form-control form-input form-textarea"
              rows={4}
              value={news.content}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="validityDate" className="form-label form-title">Geçerlilik Tarihi:</label>
            <input
              type="date"
              id="validityDate"
              name="dateOfValidity"
              className="form-control form-input"
              value={news.dateOfValidity ? format(new Date(news.dateOfValidity), "yyyy-MM-dd") : ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newsLink" className="form-label form-title">Haber Linki:</label>
            <input
              type="text"
              id="newsLink"
              name="newLink"
              className="form-control form-input"
              value={news.newLink}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary form-button">Güncelle</button>
        </form>
      ) : (
        <p>Haber yükleniyor...</p>
      )}

      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {successMessage && <div className="alert alert-info mt-3">{successMessage}</div>}
    </div>
  );
};

export default NewsUpdate;
