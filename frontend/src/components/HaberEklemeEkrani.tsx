import React, { useState } from 'react';
import EventService from '../services/EventService';
import { NewDto } from '../types/New';
import 'bootstrap/dist/css/bootstrap.min.css';

const HaberEkle: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [newsLink, setNewsLink] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic || !content || !validityDate || !newsLink) {
      setErrorMessage('Lütfen tüm alanları doldurunuz.');
      return;
    }
    if (topic.length > 100) {
      setErrorMessage('Başlık en fazla 100 karakter olmalıdır.');
      return;
    }
    const dateOfValidity = new Date(validityDate);

    const entityNews: NewDto = {
      topic: topic,
      content: content,
      dateOfValidity: dateOfValidity,
      newsLink: newsLink,
    };

    try {
      await EventService.addNew(entityNews);
      setSuccessMessage('Haber başarıyla eklendi!');
      setErrorMessage(null);
      setTopic('');
      setContent('');
      setValidityDate('');
      setNewsLink('');
    } catch (error) {
      console.error('Haber eklenirken hata oluştu', error);
      setSuccessMessage(null);
      setErrorMessage('Haber eklenirken bir hata oluştu.');
    }
  };

  return (
    <div  style={{marginTop:"120px"}} className="container mt-12">
      <h1 className="text-center mb-4" style={{ color: '#333' }}>Haber Ekle</h1>
      <form onSubmit={handleSubmit} className="w-75 mx-auto"> 
        <label className="form-label" style={{ color: '#333', fontWeight: 'bold' }}>Başlık:</label>
        <input
          type="text"
          className="form-control mb-3"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: '100%' }} 
        />
        <label className="form-label" style={{ color: '#333', fontWeight: 'bold' }}>İçerik:</label>
        <textarea
          className="form-control mb-3"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%' }} 
        />
        <label className="form-label" style={{ color: '#333', fontWeight: 'bold' }}>Geçerlilik Tarihi:</label>
        <input
          type="date"
          className="form-control mb-3"
          value={validityDate}
          onChange={(e) => setValidityDate(e.target.value)}
          style={{ width: '100%' }} 
        />
        <label className="form-label" style={{ color: '#333', fontWeight: 'bold' }}>Haber Linki:</label>
        <input
          type="text"
          className="form-control mb-3"
          value={newsLink}
          onChange={(e) => setNewsLink(e.target.value)}
          style={{ width: '100%' }} 
        />
        <button type="submit" className="btn btn-success w-100 mt-3">Haber Ekle</button>
      </form>
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {successMessage && <div className="alert alert-info mt-3">{successMessage}</div>}
    </div>
  );
};

export default HaberEkle;
