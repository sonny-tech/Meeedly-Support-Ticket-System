import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTickets } from "../../Context/TicketContext";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import "../../Style/TicketDetail/TicketDetail.css";

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state, dispatch } = useTickets();
    
    const [replyText, setReplyText] = useState("");

    const ticket = state.tickets.find((t) => t.id === id);

    const handleReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newMessage = {
            id: `MSG-${Date.now()}`, // Unique ID based on timestamp
            author: "User", // POV: User
            content: replyText.trim(),
            timestamp: new Date().toISOString(),
            isStaff: false,
        };

        dispatch({
            type: "ADD_MESSAGE",
            payload: { ticketId: id, message: newMessage },
        });

        setReplyText(""); // Clear the input
    };

    if (!ticket) {
        return <div className="error">Ticket not found.</div>;
    }

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-content ticket-details-main">
                <div className="details-container">
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>
                        ← Back
                    </button>
                    
                    <section className="ticket-info-card">
                        <h1>{ticket.title}</h1>
                        <div className="metadata-row">
                            <span>Status: <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span></span>
                            <span>Priority: <span className={`priority-${ticket.priority}`}>{ticket.priority}</span></span>
                            <span>Category: {ticket.category}</span>
                            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="description-text">{ticket.description}</p>
                    </section>

                    <section className="message-history">
                        <h3>Activity</h3>
                        {ticket.messages.map((msg) => (
                            <div key={msg.id} className={`message-bubble ${msg.isStaff ? "staff" : "user"}`}>
                                <div className="message-meta">
                                    <strong>{msg.author}</strong> • {new Date(msg.timestamp).toLocaleString()}
                                </div>
                                <p>{msg.content}</p>
                            </div>
                        ))}
                    </section>

                    {/* REPLY FORM */}
                    <section className="reply-section">
                        <form onSubmit={handleReply}>
                            <textarea
                                className="reply-textarea"
                                placeholder="Write a reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={4}
                            />
                            <button type="submit" className="btn-submit" disabled={!replyText.trim()}>
                                Send Reply
                            </button>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TicketDetail;