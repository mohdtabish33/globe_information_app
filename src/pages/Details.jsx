import { useLocation } from "react-router-dom";

const Details = () => {
  const { state: country } = useLocation();

  if (!country) {
    return <div>No country selected.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg max-w-3xl w-full p-8">
        <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
        <img src={country.flags?.png} alt={country.name.common} className="mb-6 w-full max-h-64 object-contain rounded" />
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p><strong>Region:</strong> {country.region}</p>
      </div>
    </div>
  );
};

export default Details;
