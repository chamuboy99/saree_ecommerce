import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const FilterContext = createContext();

export function FilterProvider({children}){
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({});

    const location = useLocation();

    useEffect(() => {
        setFilterOpen(false);
        setFilters({});
    }, [location.pathname]);

    return (
        <FilterContext.Provider value={{filterOpen, setFilterOpen, filters, setFilters}}>
            {children}
        </FilterContext.Provider>
    );
}