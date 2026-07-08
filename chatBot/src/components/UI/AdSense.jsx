import React, { useEffect } from 'react';

const AdSense = ({ 
  slot = '8114973903', 
  client = 'ca-pub-4611978304011352', 
  format = 'auto', 
  responsive = 'true', 
  style = { display: 'block' } 
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense push error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

export default AdSense;
