import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/categoryfilter.css';
import { FilterContext } from '../contexts/FilterContext.jsx';
import { categories } from '../constants/cats.js';

export default function CategoryFilter() {
    const { showSideBar, setShowSideBar, setFilters, setSearch } = useContext(FilterContext);
    const [expanded, setExpanded] = useState(null);
    const navigate = useNavigate();

    if (!showSideBar) return null;

    const toggleCategory = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const selectCategory = (category) => {
        setSearch("");
        if (category.name === "All") setFilters({});
        else if (category.name === "Best Sellers") setFilters({ bestSeller: true });
        else setFilters({ category: category.name });
        setShowSideBar(false);
        navigate('/sarees');
    }

    const selectSubCategory = (category, subcat) => {
        setSearch("");
        setFilters({
            category: category.name,
            subCategory: subcat.name
        });
        setShowSideBar(false);
        navigate('/sarees');
    }

    const selectSubSubCategory = (category, subcat, subsubcat) => {
        setSearch("");
        setFilters({
            category: category.name,
            subCategory: subcat.name,
            subSubCategory : subsubcat
        });
        setShowSideBar(false); 
        navigate('/sarees');
    }

    return (
        <aside className={`filter-panel ${showSideBar ? "open" : ""}`}>
            <div>
                <h2>Categories</h2>
            </div>
            {categories.map((category, index) => (
                <div key={category.name} className='category-item'>
                    <div className='category-row'>
                        <button className='category-name' onClick={() => selectCategory(category)}>
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
                                    <button className='subcategory-row' onClick={() => selectSubCategory(category, sub)}>
                                        {sub.name}
                                    </button>
                                    {sub.subSubCategories && (
                                        <div className='subsubcategory-list'>
                                            {sub.subSubCategories.map(s => (
                                                <div key={s}>
                                                    <button onClick={() => selectSubSubCategory(category, sub, s)}>
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