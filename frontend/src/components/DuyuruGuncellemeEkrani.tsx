import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoticeService from '../services/NoticeServices';
import { format } from 'date-fns';
import { Notice, NoticeRequestDto } from '../types/Notice';
import "../styles/HaberGuncelle.css"
const NoticeUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const noticeFetchDetail = async () => {
      if (id) {
        try {
          const response = await NoticeService.getNoticeById(Number(id)); 
          setNotice(response.data);

          if (response.data.id) {
            // Görseli almak için NoticeService'i kullanıyoruz
            const imageResponse = await NoticeService.getImage(response.data.id);
            const url = URL.createObjectURL(imageResponse.data);
            setImageSrc(url);

            // Blob objesini File objesine dönüştürerek selectedFile olarak ayarlayın
            const file = new File([imageResponse.data], "currentImage.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
          }
        } catch (error) {
          console.error('Duyuru detayları alınırken hata oluştu', error);
        }
      }
    };

    noticeFetchDetail();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (notice) {
      setNotice({
        ...notice,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (notice && id) {
      const updatedDto: NoticeRequestDto = {
        topic: notice.topic,
        content: notice.content,
        dateOfValidity: notice.dateOfValidity,
      };
  
      if (!updatedDto.content || !updatedDto.dateOfValidity || !updatedDto.topic) {
        setErrorMessage('Lütfen tüm alanları doldurunuz.');
        return;
      }
  
      try {
        console.log(JSON.stringify(updatedDto));

        const formData = new FormData();
        formData.append('data', JSON.stringify(updatedDto));
  
        if (selectedFile) {
          formData.append('file', selectedFile);
        }
  
        await NoticeService.updateNotice(Number(id), updatedDto, selectedFile!);
        setSuccessMessage('Güncelleme İşlemi Başarılı.');
        setErrorMessage(null);
      } catch (error) {
        console.error('Duyuru güncellenirken hata oluştu', error);
        setErrorMessage('Duyuru güncellenirken bir hata oluştu.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 style={{ marginTop:"120px", color:"black"}} >Duyuru Güncelle</h1>
      {notice ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={{color:"black"}}  htmlFor="topic" className="form-label">Başlık:</label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="form-control"
              value={notice.topic}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label style={{color:"black"}} htmlFor="content" className="form-label">İçerik:</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              rows={4}
              value={notice.content}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label  style={{color:"black"}} htmlFor="validityDate" className="form-label">Geçerlilik Tarihi:</label>
            <input
              type="date"
              id="validityDate"
              name="dateOfValidity"
              className="form-control"
              value={notice.dateOfValidity ? format(new Date(notice.dateOfValidity), "yyyy-MM-dd") : ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label style={{color:"black"}} htmlFor="image" className="form-label">Görsel:</label>
            {imageSrc && <img src={imageSrc} alt="Güncel Görsel" className="img-thumbnail mb-3" style={{ width: '200px', height: 'auto' }} />}
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Güncelle</button>
        </form>
      ) : (
        <p>Haber yükleniyor...</p>
      )}

      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {successMessage && <div className="alert alert-info mt-3">{successMessage}</div>}
    </div>
  );
};

export default NoticeUpdate;
