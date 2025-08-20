import React, { useState, useEffect } from 'react'

const Compare = () => {
  const [filter, setFilter] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [countryData, setCountryData] = useState([])
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [error, setError] = useState('')

  // Clear filter and search results when 3 countries selected
  useEffect(() => {
    if (selectedCountries.length >= 3) {
      setFilter('')
      setSearchResults([])
      setError('')
    }
  }, [selectedCountries])

  // Debounced search for countries by name
  useEffect(() => {
    if (filter.trim().length < 2) {
      setSearchResults([])
      setError('')
      return
    }

    setLoadingSearch(true)
    setError('')

    const debounce = setTimeout(() => {
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(filter.trim())}`)
        .then(res => {
          if (!res.ok) throw new Error('No countries found')
          return res.json()
        })
        .then(data => {
          if (Array.isArray(data)) {
            const names = data.map(c => c.name.common).sort()
            setSearchResults(names)
          } else {
            setSearchResults([])
            setError('No countries found')
          }
        })
        .catch(() => {
          setSearchResults([])
          setError('No countries found')
        })
        .finally(() => setLoadingSearch(false))
    }, 300)

    return () => clearTimeout(debounce)
  }, [filter])

  // Fetch details for selected countries
  useEffect(() => {
    if (selectedCountries.length === 0) {
      setCountryData([])
      return
    }

    setLoadingDetails(true)

    Promise.all(
      selectedCountries.map(country =>
        fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`)
          .then(res => res.json())
      )
    )
      .then(responses => {
        setCountryData(
          responses
            .map(r => (Array.isArray(r) && r.length > 0 ? r[0] : null))
            .filter(Boolean)
        )
      })
      .catch(err => {
        console.error('Failed to fetch country details', err)
        setCountryData([])
      })
      .finally(() => setLoadingDetails(false))
  }, [selectedCountries])

  const toggleCountry = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country))
    } else if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, country])
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white py-10 pt-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Compare Countries</h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-4">
          <input
            type="text"
            placeholder="Type at least 2 characters to search..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-md border shadow dark:bg-gray-800 dark:text-white"
            disabled={selectedCountries.length >= 3}
          />
        </div>

        {/* Disabled input info */}
        {selectedCountries.length >= 3 && (
          <p className="text-center text-yellow-500 mb-6">
            You have selected 3 countries. Please clear one to search again.
          </p>
        )}

        {/* Loading and Error for search */}
        {loadingSearch && <p className="text-center mb-4">Searching...</p>}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {/* Search Results Buttons */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
            {searchResults.map(country => (
              <button
                key={country}
                onClick={() => toggleCountry(country)}
                disabled={!selectedCountries.includes(country) && selectedCountries.length >= 3}
                className={`py-2 px-3 border rounded-md font-medium transition-all text-sm
                  ${selectedCountries.includes(country)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800'
                  }
                  ${!selectedCountries.includes(country) && selectedCountries.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {country}
              </button>
            ))}
          </div>
        )}

        {/* Clear Selection */}
        {selectedCountries.length > 0 && (
          <div className="text-center mb-6">
            <button
              onClick={() => setSelectedCountries([])}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* No countries selected message */}
        {!loadingDetails && countryData.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
            Select up to 3 countries to compare.
          </p>
        )}

        {loadingDetails && <p className="text-center mb-4">Loading country details...</p>}

        {/*Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {countryData.map((country, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center"
            >
              <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-24 h-auto mx-auto mb-3"
              />
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Compare
