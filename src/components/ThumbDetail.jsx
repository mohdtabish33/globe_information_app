import React from 'react'

const ThumbDetail = ({ title, image_url, population, region, capital, area, subregion, languages }) => {
  return (
    <div className="p-4">
      <img src={image_url} alt={`${title} flag`} className="w-full h-40 object-cover mb-4 rounded" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Area:</strong> {area?.toLocaleString()} km²</p>
      <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
      <p><strong>Languages:</strong> {languages ? Object.values(languages).join(', ') : 'N/A'}</p>
    </div>
  )
}

export default ThumbDetail
