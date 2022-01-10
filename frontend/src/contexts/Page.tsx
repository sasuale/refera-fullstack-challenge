import React, { createContext, useContext, useState } from "react";

export enum Page {
    Category = 'Category',
    Company = 'Company',
    Order = 'Order',
}

type ContextType = {
    page: Page;
    setPage: (page: Page) => void;
}

const Context = createContext<ContextType>({
    page: Page.Order,
    setPage: (page: Page) => console.warn('no page provider'),
});

export const usePage = () => useContext(Context);

export const PageStore: React.FC = ({ children }) => {
    const [page, setPage] = useState(Page.Order);
    return (
        <Context.Provider value={{page, setPage}}>{children}</Context.Provider>
    );
};