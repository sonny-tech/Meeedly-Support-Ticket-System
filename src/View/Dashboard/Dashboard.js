import { useState } from "react";
import { useTickets } from "../../Context/TicketContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import CreateTicket from "../CreateTicket/CreateTicket";
import "../../Style/Dashboard/Dashboard.css";

const Dashboard = () => {
    const { state } = useTickets();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = state.tickets.filter((ticket) => {
        const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
        const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesPriority && matchesSearch;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case "open": return "badge badge-open";
            case "in-progress": return "badge badge-in-progress";
            case "resolved": return "badge badge-resolved";
            default: return "badge";
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case "high": return "badge badge-high";
            case "medium": return "badge badge-medium";
            case "low": return "badge badge-low";
            default: return "badge";
        }
    };

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-content dashboard-main">
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <h1 className="dashboard-title">Support Tickets</h1>
                        <button
                            className="btn-create"
                            onClick={() => navigate("/tickets/new")}
                        >
                            + New Ticket
                        </button>
                    </div>

                    <div className="dashboard-filters">
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="filter-search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <select
                            className="filter-select"
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="empty-state">
                            <p>No tickets found.</p>
                        </div>
                    ) : (
                        <div className="ticket-table">
                            <div className="ticket-table-header">
                                <span>ID</span>
                                <span>Title</span>
                                <span>Status</span>
                                <span>Priority</span>
                                <span>Category</span>
                                <span>Created</span>
                            </div>
                            {filtered.map((ticket) => (
                                <div
                                    className="ticket-row"
                                    key={ticket.id}
                                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                                >
                                    <span className="ticket-id">{ticket.id}</span>
                                    <span className="ticket-title">{ticket.title}</span>
                                    <span><span className={getStatusClass(ticket.status)}>{ticket.status}</span></span>
                                    <span><span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span></span>
                                    <span className="ticket-category">{ticket.category}</span>
                                    <span className="ticket-date">
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;