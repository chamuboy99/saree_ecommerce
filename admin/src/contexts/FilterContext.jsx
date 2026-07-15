import { useState } from "react";
import { createContext } from "react";

export const FilterContext = createContext();

export default function FilterProvider({ children }){
    const [showSideBar,  setShowSideBar] = useState(false);

    return(
        <FilterContext.Provider value={{showSideBar, setShowSideBar}}>
            {children}
        </FilterContext.Provider>
    );
}