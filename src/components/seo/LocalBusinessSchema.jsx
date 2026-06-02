import React from 'react';
import Helmet from 'react-helmet';

const LocalBusinessSchema = ({ businessData }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...businessData
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;