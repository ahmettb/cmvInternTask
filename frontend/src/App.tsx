import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import AddNewsForm from './components/HaberEklemeEkrani';
import NewsList from './components/HaberListe';
import NewsUpdate from './components/HaberGuncelle';
import NoticeAdd from './components/DuyuruEklemeEkrani';
import NoticeList from './components/DuyuruListe';
import NoticeUpdate from './components/DuyuruGuncellemeEkrani';
import DuyuruGoruntule from './components/DuyuruGoruntule';
import HaberGoruntule from './components/HaberGoruntule';
import LoginPage from './components/GirisEkran';
import Unauthorized from './components/Unauthorized';
import AdminRoute from './components/AdminRoute'; 

const App: React.FC = () => {

  
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Navigate to="/duyurular" replace />} />
        <Route path="/duyurular" element={<DuyuruGoruntule />} />

        <Route path="/haberler" element={<HaberGoruntule />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="admin/*" element={<AdminRoute />}>
            <Route path="news-update/:id" element={<NewsUpdate />} />
            <Route path="news-list" element={<NewsList />} />
            <Route path="add-notice" element={<NoticeAdd />} />
            <Route path="notice-list" element={<NoticeList />} />
            <Route path="notice-update/:id" element={<NoticeUpdate />} />
            <Route path="add-news" element={<AddNewsForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
