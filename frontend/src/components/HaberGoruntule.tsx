import "../styles/tes.css";
import React, { useState, useEffect } from 'react';
import { News } from "../types/New";
import EventService from "../services/EventService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import AnaSayfaNavbar from "./AnaSayfaNavbar";

const HaberGoruntule: React.FC = () => {
  const [haberler, setHaberler] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNew, setSelectedNew] = useState<News | null>(null);

  useEffect(() => {
    EventService.getAllNew()
      .then(response => {
        setHaberler(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
      });
  }, []);

  const handleShowDetails = (newItem: News) => {
    setSelectedNew(newItem);
  };

  const handleCloseModal = () => {
    setSelectedNew(null);
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (

    <><AnaSayfaNavbar /><section className="dark">
      <div className="container py-3">
      <h1 style={{color:"white"}}  className="h1 text-center" id="pageHeaderTitle">Haberler</h1>

        {haberler.map((haber) => (
          <article className="postcard dark blue" key={haber.id}>
            <div className="postcard__text">
              <h1 className="postcard__title blue">{haber.topic}</h1>
              <div className="button-container text-center" style={{ marginTop: '10px' }}>
                <button
                  className="btn btn-outline-light"
                  onClick={() => handleShowDetails(haber)}
                >
                  Haber Detayı Gör
                </button>
              </div>
            </div>
          </article>
        ))}

        {/* Modal */}
        {selectedNew && (
          <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedNew.topic}</h5>
                </div>
                <div className="modal-body">
                  <p>{selectedNew.content}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Kapat</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section></>
  );
}

export default HaberGoruntule;
