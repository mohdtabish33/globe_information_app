import React from "react";

const About = () => {
  return (
    <section className="min-h-[400px] bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
        <h3 className="text-4xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
          About This App
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
          This React application provides a comprehensive platform combining the latest news updates with detailed country information. Users can search and filter news articles to stay informed on topics that matter most.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
          Alongside news, the app offers rich data on countries — including flags, regions, capitals, and languages — making it easy to explore global diversity.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          Additionally, the powerful comparison tool allows users to compare two or three countries side-by-side, helping analyze differences and similarities effortlessly.
        </p>
        <p className="mt-6 text-gray-600 dark:text-gray-400 italic text-base">
          Designed to be intuitive and interactive, this app is perfect for users who want to stay updated and dive deep into global data.
        </p>
      </div>
    </section>
  );
};

export default About;
