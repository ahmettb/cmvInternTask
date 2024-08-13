import React, { useState, useEffect } from 'react';
import { Notice } from "../types/Notice";
import NoticeServices from "../services/NoticeServices";
import AnaSayfaNavbar from "../components/AnaSayfaNavbar";

const DuyuruGoruntule: React.FC = () => {
    const [duyurular, setDuyurular] = useState<Notice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        NoticeServices.getAll()
            .then(response => {
                const updatedDuyurular = response.data.map(notice => {
                    const imageBase64 = `data:image/jpeg;base64,${notice.image}`;
                    console.log('Image Base64:', imageBase64); 
                    return { ...notice, image: imageBase64 };
                });
                setDuyurular(updatedDuyurular);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Kayıtlı Veri Bulunamadı');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <AnaSayfaNavbar />
            <section className="dark">
                <div className="container py-4">
                    <h1 style={{color:"white"}}  className="h1 text-center" id="pageHeaderTitle">Duyurular</h1>
                    {duyurular.map((duyuru) => (
                        <article key={duyuru.id} className="postcard dark blue">
                                <img className="postcard__img" src={duyuru.image} alt="Image Title" />
                            <div className="postcard__text">
                                <h1 className="postcard__title blue"><a href="#">{duyuru.topic}</a></h1>
                                <div className="postcard__subtitle small"></div>
                                <div className="postcard__bar"></div>
                                <div className="postcard__preview-txt">{duyuru.content}</div>
                                <ul className="postcard__tagbox"></ul>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
};

export default DuyuruGoruntule;
