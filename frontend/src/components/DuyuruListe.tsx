import React, { useEffect, useState } from 'react';
import NoticeService from '../services/NoticeServices';
import { Notice } from '../types/Notice';
import NoticeCard from './DuyuruKart';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const NoticeList: React.FC = () => {
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const navigate = useNavigate();

  const fetchNotices = async () => {
    try {
      const response = await NoticeService.getNoticesAllDetail();
      setNoticeList(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Kayıtlı Duyuru Yok');
      } else {
        console.error('Duyurular alınırken hata oluştu', error);
        setErrorMessage('Duyurular alınırken bir hata oluştu');
      }
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleUpdate = (id: number) => {
    navigate(`/admin/notice-update/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Duyuruyu silmek istediğinizden emin misiniz?");
    if (isConfirmed) {
      try {
        await NoticeService.deleteNotice(id);
        fetchNotices(); 
      } catch (error) {
        console.error('Duyuru silinirken hata oluştu', error);
      }
    }
  };

  return (
    <div className="container">
      {errorMessage ? (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      ) : (
        <div className="row">
          {noticeList.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeList;
