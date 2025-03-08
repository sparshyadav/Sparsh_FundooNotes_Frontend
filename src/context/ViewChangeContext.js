import { createContext, useContext, useState } from "react";

const ViewChangeContext = createContext();

export const ViewChangeProvider = ({ children }) => {
    const [view, setView] = useState(true);

    return (
        <ViewChangeContext.Provider value={{ view, setView }}>
            {children}
        </ViewChangeContext.Provider>
    );
};

export const useChangeView = () => useContext(ViewChangeContext);
