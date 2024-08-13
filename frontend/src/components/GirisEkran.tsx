import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });

            const { jwtToken, roles } = response.data;

            if (roles.includes('[ADMIN]')) {
                localStorage.setItem('jwtToken', jwtToken);
                localStorage.setItem('roles', JSON.stringify(roles));
                navigate('/admin/news-list');
            } else {
                setMessage('Yetersiz izinler');
            }
        } catch (error) {
            console.error('Giriş hatası:', error);
            setMessage('Giriş işlemi başarısız');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1 style={{ color: "black" }}>Admin Paneli Giriş</h1>

                <div className="form-outline mb-4">
                    <label className="form-label text-dark" htmlFor="form2Example1">
                        Kullanıcı Adı
                    </label>
                    <input
                        type="text"
                        id="form2Example1"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label text-dark" htmlFor="form2Example2">
                        Şifre
                    </label>
                    <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                >
                    Giriş Yap
                </button>

                {message && <div className="alert alert-danger" role="alert">{message}</div>}
            </form>
        </div>
    );
};

export default LoginPage;
