import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../../Context/TicketContext";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import "../../Style/CreateTicket/CreateTicket.css";

const CreateTicket = () => {
    const { dispatch, state } = useTickets();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        category: "general",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (form.title.trim().length < 5) newErrors.title = "Title must be at least 5 characters";
        if (form.description.trim().length < 10) newErrors.description = "Description must be at least 10 characters";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newId = `TKT-${String(state.tickets.length + 1).padStart(3, "0")}`;
        const now = new Date().toISOString();

        const newTicket = {
            id: newId,
            title: form.title.trim(),
            description: form.description.trim(),
            status: "open",
            priority: form.priority,
            category: form.category,
            createdAt: now,
            updatedAt: now,
            messages: [
                {
                    id: "MSG-001",
                    author: "User",
                    content: form.description.trim(),
                    timestamp: now,
                    isStaff: false,
                },
            ],
        };

        dispatch({ type: "ADD_TICKET", payload: newTicket });
        navigate("/dashboard");
    };

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-content create-main">
                <div className="create-container">
                    <div className="create-header">
                        <button className="btn-back" onClick={() => navigate("/dashboard")}>
                            ← Back
                        </button>
                        <h1 className="create-title">Submit a Ticket</h1>
                    </div>

                    <form className="create-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className={`form-input ${errors.title ? "input-error" : ""}`}
                                placeholder="Brief summary of your issue"
                                value={form.title}
                                onChange={handleChange}
                            />
                            {errors.title && <span className="error-msg">{errors.title}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className={`form-textarea ${errors.description ? "input-error" : ""}`}
                                placeholder="Describe your issue in detail..."
                                value={form.description}
                                onChange={handleChange}
                                rows={6}
                            />
                            {errors.description && <span className="error-msg">{errors.description}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Priority</label>
                                <select
                                    name="priority"
                                    className="form-select"
                                    value={form.priority}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={form.category}
                                    onChange={handleChange}
                                >
                                    <option value="general">General</option>
                                    <option value="auth">Auth</option>
                                    <option value="billing">Billing</option>
                                    <option value="technical">Technical</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit">
                            Submit Ticket
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateTicket;