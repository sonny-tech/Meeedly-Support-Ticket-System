import React, { useState, useEffect, useRef } from "react";
import "../../Style/Home/Home.css";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import CommonHomeUtils from "../../Scripts/Home/CommonHomeUtils";

const Home = () => {
    const [count, setCount] = useState(null);
    const hasLoaded = useRef(false);

    useEffect(() => {
        const saved = CommonHomeUtils.getSavedCounter();
        setCount(saved);
        hasLoaded.current = true;
    }, []);

    useEffect(() => {
        if (hasLoaded.current && count !== null) {
            CommonHomeUtils.saveCounter(count);
        }
    }, [count]);

    const handleIncrease = () => {
        setCount((prev) => (prev ?? 0) + 1);
    };

    const handleDecrease = () => {
        setCount((prev) => {
            if ((prev ?? 0) > 0) return prev - 1;
            return prev;
        });
    };

    // Show loading while count is null
    if (count === null) return <div>Loading...</div>;

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-content">
                <div className="home-container">
                    <h1 className="home-title">🏠 Home Page</h1>
                    <div className="home-counter">Counter: {count}</div>
                    <div className="button-group">
                        <button className="button increase" onClick={handleIncrease}>
                            Increase
                        </button>
                        <button className="button decrease" onClick={handleDecrease}>
                            Decrease
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;