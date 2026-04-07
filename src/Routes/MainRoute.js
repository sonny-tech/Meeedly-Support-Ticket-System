import { Routes, Route } from "react-router-dom";
import Home from "../View/Home/Home";
import About from "../View/About/About";
import Settings from "../View/Settings/Settings";
import Error404 from "../View/Error404/Error404";
import Dashboard from "../View/Dashboard/Dashboard";
import CreateTicket from "../View/CreateTicket/CreateTicket";
import TicketDetail from "../View/TicketDetail/TicketDetail";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MainRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets/new" element={<CreateTicket />} />
                <Route path="/tickets/:id" element={<TicketDetail />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}