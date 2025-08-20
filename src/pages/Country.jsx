import React, { useEffect, useState } from 'react'
import ThumbDetail from '../components/ThumbDetail'
import { Link } from 'react-router-dom'

function Country() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, SetLoading] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`)
        const data = await res.json()
        setCountries(data)
        setHasSearched(false)
      } catch (error) {
        console.error("Error fetching all countries:", error)
      }
    }
    fetchCountries()
  }, [])

  const filterByRegion = async (region) => {
    if (region === '') return
    setHasSearched(false)
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
      if (!res.ok) throw new Error(`Failed to fetch region: ${res.status}`)
      const data = await res.json()
      setCountries(data)
    } catch (error) {
      console.error("Region filter failed:", error)
      setCountries([])
    }
  }

  const searchCountry = async (term) => {
    const trimmedTerm = term.trim()
    if (!trimmedTerm || trimmedTerm.length < 2) return
    setHasSearched(true);
    SetLoading(true);
    try {
      const encodedTerm = encodeURIComponent(trimmedTerm)
      const res = await fetch(`https://restcountries.com/v3.1/name/${encodedTerm}`)
      if (res.status === 404) {
        setCountries([])
        return
      }
      if (!res.ok) throw new Error(`Search failed: ${res.status}`)
      const data = await res.json()
      setCountries(data)
    } catch (error) {
      console.error("Search error:", error)
      setCountries([])
    } finally {
      SetLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-800 py-10 pt-28">
      <div className="w-full shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white fixed top-0 left-0 z-50">
        <div className="flex container mx-auto items-center">
          <h1 className="font-bold text-xl sm:text-2xl">Where in the world?</h1>
        </div>
      </div>

      <div className="container mx-auto mt-6 px-4 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-1/3 flex space-x-2">
            <input
              type="text"
              placeholder="Search for a country..."
              className="pl-4 pr-4 py-2 w-full shadow-md rounded-l-md dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setHasSearched(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim().length >= 2) {
                  searchCountry(searchTerm);
                }
              }}
            />
            <button
              onClick={() => searchCountry(searchTerm)}
              disabled={searchTerm.trim().length < 2}
              className={`px-4 rounded-r-md text-white ${searchTerm.trim().length >= 2
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-blue-300 cursor-not-allowed'
                }`}
            >
              Search
            </button>

          </div>

          <select
            className="p-2 w-full sm:w-auto shadow-md rounded-md font-medium dark:bg-gray-700 dark:text-white"
            onChange={val => filterByRegion(val.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : hasSearched && searchTerm.trim().length >= 2 && countries.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-400 mt-12 font-semibold">
            No countries found for "{searchTerm}". Please try a different name.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {countries.map((country, index) => (
              <Link
                to="/details"
                state={country}
                key={index}
                className="transform hover:scale-105 transition-all duration-300 ease-in-out" >
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg overflow-hidden h-full">
                  <ThumbDetail
                    title={country.name?.common}
                    image_url={country.flags?.png}
                    population={country.population}
                    region={country.region}
                    capital={country.capital?.[0] || 'N/A'}
                    area={country.area}
                    subregion={country.subregion}
                    languages={country.languages}
                  />

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Country
