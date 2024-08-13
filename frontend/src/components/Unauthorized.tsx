// Unauthorized.tsx
import React, { useEffect } from 'react';

const Unauthorized: React.FC = () => {
  useEffect(() => {
    document.title = "Unauthorized"; 
  }, []);

  return (
    <div>
      <h1 style={{color:"black"}}>Yetkisiz Erişim</h1>
      <p style={{color:"black"}}>Bu sayfayı görüntülemek için yetkiniz yok.</p>
    </div>
  );
};

export default Unauthorized;
