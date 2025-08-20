import React, { useEffect, useState } from "react";

const API_KEY = "32101940ea6c4902965da2f53d0bb1a3";

const categories = [
  { value: "", label: "All" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];

const PAGE_SIZE = 8;

const News = ({ countryCode = "us" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;

      if (category) {
        url += `&category=${category}`;
      }

      if (searchTerm.trim() !== "") {
        url += `&q=${encodeURIComponent(searchTerm.trim())}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "ok") {
        setArticles(data.articles);
      } else {
        setError(data.message || "Failed to fetch news");
      }
    } catch (err) {
      setError("Oops! Something went wrong while fetching news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [countryCode, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-800 py-10 pt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            Latest News
          </h2>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 border-b-4 border-gray-400 inline-block pb-2">
            Stay updated with top headlines from around the world
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto mb-8"
        >
          <input
            type="text"
            placeholder="Search news..."
            className="flex-grow rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center flex-col gap-4 py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Loading latest news...
            </p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300 font-semibold">
            No articles found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-900 border border-gray-800 dark:border-gray-600 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                )}
                <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-2 text-lg line-clamp-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 line-clamp-1">
                  {article.source.name}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                {article.description && (
                  <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-2 mt-2">
                    {article.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
