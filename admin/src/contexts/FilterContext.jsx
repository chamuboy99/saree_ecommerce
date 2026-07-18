import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation } from 'react-router-dom';

export const FilterContext = createContext();

export default function FilterProvider({ children }){
    const [showSideBar,  setShowSideBar] = useState(false);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState("");

    const location = useLocation();

    useEffect(() => {
        if(!location.pathname.startsWith('/sarees')){
            setShowSideBar(false);
            setFilters({});
            setSearch("");
        }
    }, [location.pathname]);

    return(
        <FilterContext.Provider value={{showSideBar, setShowSideBar, filters, setFilters, search, setSearch}}>
            {children}
        </FilterContext.Provider>
    );
}