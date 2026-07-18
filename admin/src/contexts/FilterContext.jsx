import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation } from 'react-router-dom';

export const FilterContext = createContext();

export default function FilterProvider({ children }){
    const [showSideBar,  setShowSideBar] = useState(false);
    const [filters, setFilters] = useState({});
    const location = useLocation();

    useEffect(() => {
        if(!location.pathname.startsWith('/admin-dashboard')){
            setShowSideBar(false);
            setFilters({});
        }
    }, [location.pathname]);

    return(
        <FilterContext.Provider value={{showSideBar, setShowSideBar, filters, setFilters}}>
            {children}
        </FilterContext.Provider>
    );
}