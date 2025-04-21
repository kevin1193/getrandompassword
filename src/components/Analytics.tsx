import React from 'react';
import { Helmet } from 'react-helmet-async';

const GOOGLE_ANALYTICS_ID = 'G-XXXXXXXXXX'; // Replace with your GA ID

const Analytics: React.FC = () => {
  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </script>
    </Helmet>
  );
};

export default Analytics; 