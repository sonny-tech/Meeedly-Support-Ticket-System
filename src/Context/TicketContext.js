import { createContext, useContext, useReducer, useEffect, useState } from "react";
import mockTickets from "../Data/mockTickets";

const TicketContext = createContext();

const ticketReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TICKET":
            return { ...state, tickets: [action.payload, ...state.tickets] };
        case "UPDATE_TICKET":
            return {
                ...state,
                tickets: state.tickets.map((t) =>
                    t.id === action.payload.id ? action.payload : t
                ),
            };
        case "ADD_MESSAGE":
            return {
                ...state,
                tickets: state.tickets.map((t) =>
                    t.id === action.payload.ticketId
                        ? { ...t, messages: [...t.messages, action.payload.message] }
                        : t
                ),
            };
        default:
            return state;
    }
};

export const TicketProvider = ({ children }) => {
    const saved = localStorage.getItem("tickets");
    const initial = saved ? JSON.parse(saved) : mockTickets;

    const [state, dispatch] = useReducer(ticketReducer, { tickets: initial });

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        console.log("Switching theme to:", newTheme);
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.body.className = theme; 
        console.log("Body class applied:", document.body.className);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("tickets", JSON.stringify(state.tickets));
    }, [state.tickets]);

    return (
        <TicketContext.Provider value={{ state, dispatch, theme, toggleTheme }}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTickets = () => useContext(TicketContext);