import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema = ({ businessData }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...businessData,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
