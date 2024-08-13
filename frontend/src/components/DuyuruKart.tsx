import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Notice } from '../types/Notice';
import { format } from 'date-fns';
import NoticeService from '../services/NoticeServices';
import "../App.css";

interface NoticeCardProps {
  notice: Notice;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (notice.id) {
      NoticeService.getImage(notice.id)
        .then(response => {
          const url = URL.createObjectURL(response.data);
          setImageSrc(url);
        })
        .catch(error => {
          console.error('Görsel yükleme hatası:', error);
          setImageSrc('default-image.jpg'); // Varsayılan bir resim belirle
        });
    } else {
      setImageSrc('default-image.jpg'); // Varsayılan bir resim belirle
    }
  }, [notice.id]);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card style={{ marginLeft:"80px", width: '30rem', marginBottom: '1rem' }}>
      <Card.Img 
        variant="top" 
        src={imageSrc || 'default-image.jpg'} 
        className="img-thumbnail"
        style={{  objectFit: 'contain' }} 
      />
      <Card.Body>
        <Card.Title>{notice.topic}</Card.Title>
        <Card.Text>
          {isExpanded ? notice.content : `${notice.content.substring(0, 300)}...`}
        </Card.Text>
        <button onClick={handleReadMore} className="btn btn-link">
          {isExpanded ? 'Daha az oku...' : 'Daha fazla oku...'}
        </button>
        <small className="text-muted">
          <strong>Geçerlilik Tarihi: </strong>
          {format(new Date(notice.dateOfValidity), 'dd MMM yyyy')}
        </small>
      </Card.Body>
      <Card.Footer className="text-center">
     
        <div className="mt-2 d-flex justify-content-center">
          <button
            onClick={() => onUpdate(notice.id)}
            className="btn btn-info me-2"
          >
            Güncelle
          </button>
          <button
            onClick={() => onDelete(notice.id)}
            className="btn btn-danger"
          >
            Sil
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default NoticeCard;
