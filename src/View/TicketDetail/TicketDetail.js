import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTickets } from "../../Context/TicketContext";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import "../../Style/TicketDetail/TicketDetail.css";

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useTickets();

    // Find the specific ticket from context state
    const ticket = state.tickets.find((t) => t.id === id);

    if (!ticket) {
        return (
            <div className="page-wrapper">
                <Navigation />
                <main className="main-content">
                    <div className="error-container">
                        <h2>Ticket Not Found</h2>
                        <button className="btn-back" onClick={() => navigate("/dashboard")}>
                            Return to Dashboard
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-content ticket-details-main">
                <div className="details-container">
                    <div className="details-header">
                        <button className="btn-back" onClick={() => navigate("/dashboard")}>
                            ← Back to Dashboard
                        </button>
                        <div className="header-info">
                            <h1 className="ticket-id">{ticket.id}</h1>
                            <span className={`status-badge status-${ticket.status}`}>
                                {ticket.status.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <section className="ticket-info-card">
                        <h2 className="ticket-title">{ticket.title}</h2>
                        <div className="metadata-row">
                            <p><strong>Category:</strong> {ticket.category}</p>
                            <p><strong>Priority:</strong> <span className={`priority-${ticket.priority}`}>{ticket.priority}</span></p>
                            <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="description-section">
                            <h3>Original Description</h3>
                            <p className="description-text">{ticket.description}</p>
                        </div>
                    </section>

                    <section className="message-history">
                        <h3>Conversation History</h3>
                        {ticket.messages.map((msg) => (
                            <div key={msg.id} className={`message-bubble ${msg.isStaff ? "staff" : "user"}`}>
                                <div className="message-meta">
                                    <span className="author">{msg.author}</span>
                                    <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
                                </div>
                                <p className="message-content">{msg.content}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TicketDetail;