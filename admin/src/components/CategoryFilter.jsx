import { useContext } from 'react';
import '../styles/categoryfilter.css';
import { FilterContext } from '../contexts/FilterContext.jsx';

export default function CategoryFilter() {
    const { showSideBar, setShowSideBar } = useContext(FilterContext);
    
    if(!showSideBar) return null;

    return(
        <aside className={`filter-panel ${showSideBar ? "open" : ""}`}>
            <div>
                <h1>Side Bar</h1>
            </div>
        </aside>
    );
}