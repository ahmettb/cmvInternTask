    import React, { useState } from 'react';
    import NoticeService from '../services/NoticeServices';
    import { NoticeRequestDto } from '../types/Notice';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useNavigate } from 'react-router-dom';
import axios from 'axios';

    const AddNotice: React.FC = () => {
    const [topic, setTopic] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validityDate, setValidityDate] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const navigate=useNavigate();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic || !content || !validityDate || !file) {
        setErrorMessage('Lütfen tüm alanları doldurunuz.');
        return;
        }

        if (topic.length > 50) {
            setErrorMessage('Başlık en fazla 50 karakter olmalıdır.');
            return;
          }
        const formData = new FormData();

        const dateOfValidity = new Date(validityDate);

        // Create notice object
        const notice: NoticeRequestDto = {
        topic: topic,
        content: content,
        dateOfValidity: dateOfValidity,
        };

        formData.append('data', JSON.stringify(notice));

        // Append the file
        if (file) {
        formData.append('file', file);
        }

        try {
        await NoticeService.addNotice(notice,file);
        setSuccessMessage('Duyuru başarıyla eklendi!');
        setErrorMessage(null);
        }
         catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 403) {
                    navigate('/unauthorized');
                } else {
                    setErrorMessage('Duyuru eklenirken bir hata oluştu.');
                }        }
            }
    };

    return (
        <div  style={{marginTop:"120px"}} className="container mt-12">
        <form className="w-75 mx-auto"  onSubmit={handleSubmit}>
        <h1 className="text-center mb-4" style={{ color: '#333' }}>Duyuru Ekle</h1>
        <div className="form-group">
            <label style={{color:'black', fontWeight: 'bold' }} htmlFor="topic">Duyuru Başlığı</label>
            <input
                type="text"
                id="topic"
                className="form-control"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="content" style={{color:'black', fontWeight: 'bold' }}>İçerik:</label>
            <textarea
                id="content"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{height:"150px"}}
            />
            </div>
            <div className="form-group">
            <label  style={{color:'black', fontWeight: 'bold' }} htmlFor="validityDate">Geçerlilik Tarihi:</label>
            <input
                type="date"
                id="validityDate"
                className="form-control"
                value={validityDate}
                onChange={(e) => setValidityDate(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label style={{color:'black', fontWeight: 'bold' }} htmlFor="file">Resim:</label>
            <input
                type="file"
                id="file"
                className="form-control-file"
                onChange={handleFileChange}
            />
            {imagePreview && (
                <div className="mt-3">
                <img
                    src={imagePreview as string}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
                </div>
            )}
            </div>
            <button type="submit" className="btn btn-success">Duyuruyu Kaydet</button>
        </form>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        {successMessage && <div className="alert alert-info mt-3">{successMessage}</div>}
        </div>
    );
    };


    export default AddNotice;
