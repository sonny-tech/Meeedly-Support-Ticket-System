import React, { useEffect, useRef, useState, useCallback } from "react";
import "../../Style/About/About.css";
import avatar from "../../Asset/Logo/user.png";
import replyIcon from "../../Asset/SVG/reply.svg";
import ThumbsUpIcon from "../../Asset/SVGIcons/thumbsUp";
import ThumbsDownIcon from "../../Asset/SVGIcons/thumbsDown";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import DateFormats from "../../Utilities/DateFormat";

const About = () => {
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const hasFetchedInitial = useRef(false);

    const sentinelRef = useRef(null);
    const userHasScrolledRef = useRef(false);

    const [expandedReviews, setExpandedReviews] = useState({});
    const [isClamped, setIsClamped] = useState({});
    const reviewRefs = useRef([]);

    const reviews = [
    {
        initials: "GK",
        name: "Gauri K.",
        time: "3 weeks ago",
        stars: 5,
        text: "Good digital marketing and copywriting course. Easy to understand thank.",
    },
    {
        initials: "KT",
        name: "Kanishkha T.",
        time: "a month ago",
        stars: 5,
        text: "it was really awesome learned lot of things",
    },
    {
        initials: "AB",
        name: "Avik B.",
        time: "a month ago",
        stars: 4,
        text: "Apart from the fact that some of the things were a little repetitive and there were a little too many assignments, the course is really enriching and fills a marketing aspirant with so much confidence. I would have loved to have had a more hands-on learning experience. The examples provided were helpful, but at times I felt they could have been more practical or industry-focused. The instructors explained the concepts clearly, which made even complex topics easier to follow. The community discussions also added value, as it was nice to see how others approached the same problems. Overall, it's a course that challenges you, but in a good way, and I feel much more prepared than when I started",
    },
    {
        initials: "S",
        name: "Spherical",
        time: "2 months ago",
        stars: 3.5,
        text: "So far, things too generic that we all know, and the first 4 videos, too silly... I'm sorry, but I don't need so many welcome videos.",
    },
    ];

    const fetchPosts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const res = await fetch(
                `https://dummyjson.com/posts?limit=10&skip=${skip}`
            );
            const data = await res.json();

            const enrichedPosts = data.posts.map((post) => {
                const createdAt = new Date(
                    Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)
                ).toISOString();
                console.log(`Post #${post.id} createdAt:`, createdAt);
                return {
                    ...post,
                    createdAt,
                    likes: Math.floor(Math.random() * 200),
                    dislikes: Math.floor(Math.random() * 50),
                };
            });

            setPosts((prev) => [...prev, ...enrichedPosts]);
            setHasMore(skip + 10 < data.total);
            setSkip((prev) => prev + 10);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, skip]);

    const renderStars = (rating) => {
    const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<i key={i} className="bi bi-star-fill star-icon"></i>);
            } else if (rating >= i - 0.5) {
                stars.push(<i key={i} className="bi bi-star-half star-icon"></i>);
            } else {
                stars.push(<i key={i} className="bi bi-star star-icon"></i>);
            }
        }
        return stars;
    };

    const toggleReviewExpansion = (idx) => {
    setExpandedReviews((prev) => ({
        ...prev,
        [idx]: !prev[idx],
    }));
};

    useEffect(() => {
    requestAnimationFrame(() => {
        reviewRefs.current.forEach((ref, idx) => {
            if (ref) {
                const computed = getComputedStyle(ref);
                const lineHeight = parseFloat(computed.lineHeight);
                if (!lineHeight || isNaN(lineHeight)) return;
                const lines = ref.scrollHeight / lineHeight;
                if (lines > 5) {
                    setIsClamped((prev) => ({ ...prev, [idx]: true }));
                }
            }
        });
    });
}, []);

    useEffect(() => {
        if (!hasFetchedInitial.current) {
            hasFetchedInitial.current = true;
            fetchPosts();
        }
    }, [fetchPosts]);
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 100) userHasScrolledRef.current = true;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const node = sentinelRef.current;

        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (
                    entry.isIntersecting &&
                    !loading &&
                    hasMore &&
                    userHasScrolledRef.current
                ) {
                    fetchPosts();
                }
            },
            {
                root: null,
                rootMargin: "0px 0px 400px 0px",
                threshold: 0.1,
            }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [loading, hasMore, fetchPosts]);

return (
    <>
        <Navigation />
        <div className="about-page">
            <div className="review-summary-section">
                <div className="review-summary-wrapper">
                    <h4 className="course-rating-title">
                        <i className="bi bi-star-fill rating-star"></i>
                        <span className="rating-text">
                            <strong>4.2 course rating · 2K ratings</strong>
                        </span>
                    </h4>
                    <div className="review-grid">
                        {reviews.map((review, idx) => (
                            <div className="review-card" key={idx}>
                                <div className="review-header">
                                    <div className="review-avatar">{review.initials}</div>
                                    <div className="review-info">
                                        <p className="review-name">{review.name}</p>
                                        <div className="stars-time-row">
                                            <div className="stars">{renderStars(review.stars)}</div>
                                            <span>{review.time}</span>
                                        </div>
                                    </div>
                                    <i
                                        className="bi bi-three-dots-vertical"
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                </div>
                                <div
                                    ref={(el) => (reviewRefs.current[idx] = el)}
                                    className={`review-text ${
                                        expandedReviews[idx] ? "expanded" : "clamped"
                                    }`}
                                >
                                    {review.text}
                                </div>
                                {isClamped[idx] && (
                                    <button
                                        className="show-more-btn"
                                        onClick={() => toggleReviewExpansion(idx)}
                                    >
                                        {expandedReviews[idx] ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="user-posts-section">
                <div className="review-summary-wrapper">
                    <h4>
                        <strong>User Posts</strong>
                    </h4>
                    <div className="comments-container">
                        {posts.map((post) => (
                            <div className="comment-wrapper" key={post.id}>
                                <div className="comment-avatar">
                                    <img src={avatar} alt="User avatar" />
                                </div>
                                <div className="comment-card">
                                    <h3 className="comment-author">User #{post.userId}</h3>
                                    <p className="comment-time">
                                        {DateFormats.agoFormat(post.createdAt)}
                                    </p>
                                    <p className="comment-text">{post.body}</p>
                                    <div className="comment-actions">
                                        <span className="icon-text">
                                            <ThumbsUpIcon className="icon" />
                                            {post.likes}
                                        </span>
                                        <span className="icon-text">
                                            <ThumbsDownIcon className="icon" />
                                            {post.dislikes}
                                        </span>
                                        <span className="reply icon-text">
                                            <img src={replyIcon} alt="Reply" className="icon" />
                                            Reply
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    )}
                    <div
                        ref={sentinelRef}
                        className="infinite-scroll-sentinel"
                        aria-hidden="true"
                        style={{ height: 1 }}
                    />
                </div>
            </div>
        </div>
        <Footer />
    </>
);}

export default About;