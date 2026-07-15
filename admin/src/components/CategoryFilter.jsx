import { useContext, useState } from 'react';
import '../styles/categoryfilter.css';
import { FilterContext } from '../contexts/FilterContext.jsx';
import { categories } from '../constants/cats.js';

export default function CategoryFilter() {
    const { showSideBar, setShowSideBar } = useContext(FilterContext);
    const [expanded, setExpanded] = useState(null);

    if (!showSideBar) return null;

    const toggleCategory = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <aside className={`filter-panel ${showSideBar ? "open" : ""}`}>
            <div>
                <h2>Categories</h2>
            </div>
            {categories.map((category, index) => (
                <div key={category.name} className='category-item'>
                    <div className='category-row'>
                        <button className='category-name'>
                            {category.name}
                        </button>
                        {category.subCategories && (
                            <button className={`expand-btn ${expanded === index ? "rotate" : ""}`} onClick={() => toggleCategory(index)}>
                                ▼
                            </button>
                        )}
                    </div>

                    {expanded === index && category.subCategories && (
                        <div className='subcategory-list'>
                            {category.subCategories.map(sub => (
                                <div key={sub.name} className='subcategory-item'>
                                    <button className='subcategory-row'>
                                        {sub.name}
                                    </button>
                                    {sub.subSubCategories && (
                                        <div className='subsubcategory-list'>
                                            {sub.subSubCategories.map(s => (
                                                <div key={s}>
                                                    <button>
                                                        {s}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div> 
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </aside>
    );
}