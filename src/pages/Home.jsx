import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import News from "./News";
import About from "../components/About";

const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-14"></div>
            <div className="min-h-screen bg-gray-100 sm:py-0 dark:bg-gray-800 dark:text-white duration-300 overflow-hidden">
                <div className="container min-h-[700px] flex relative">
                    <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-6 place-items-center relative z-10">
                        <div className="order-2 sm:order-1 space-y-5 g:pr-20 relative z-30">
                            <h1 data-aos="fade-up" className="text-4xl font-semibold">
                                Know the Flag, Guess the Capital,<br />
                                Win the World.
                            </h1>
                            <p data-aos="fade-up" data-aos-delay="300">
                                Explore facts, take quizzes, and compare countries like never before. It’s geography — but cooler.
                            </p>

                            <div className="flex gap-6">
                                <button onClick={() => navigate("/compare")} className="flex items-center gap-2 px-4 py-2 border border-black dark:border-white rounded-md text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                                    <span>Start Exploring</span>
                                    <FaLongArrowAltRight className="text-xl align-middle" />
                                </button>
                            </div>

                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-offset="0"
                            className="order-1 sm:order-2"
                        >
                            <img
                                src="/hero.png"
                                alt="Hero"
                                className="max-w-full w-full sm:max-w-md h-auto object-contain"
                            />

                        </div>
                    </div>
                </div>
            </div>
            <News />
            <About />
        </>
    );
};

export default Home;