import { useContext, useState } from "react";
import { categories } from "../constants/categories.js";
import '../styles/categoryfilter.css';
import { FilterContext } from "../context/FilterContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CategoryFilter({ open }) {
    const [expanded, setExpanded] = useState(null);
    const {setFilterOpen, setFilters} = useContext(FilterContext);

    const navigate = useNavigate();

    const toggleCategory = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const selectCategory = (category) => {
        if (category.name === "All") {
            setFilters({});
        
        } else if (category.name === "Best Sellers") {
            setFilters({
                bestSeller: true
            });
        } else {
            setFilters({
                category: category.name
            });
        }
        setFilterOpen(false);
        navigate("/dashboard");
    };

    const selectSubCategory = (category, sub) => {
        setFilters({
            category: category.name,
            subCategory: sub.name
        });
        setFilterOpen(false);
        navigate("/dashboard");
    };

    const selectSubSubCategory = (category, sub, item) => {
        setFilters({
            category: category.name,
            subCategory: sub.name,
            subSubCategory: item
        });
        setFilterOpen(false);
        navigate("/dashboard");
    };
    

    if (!open) return null;

    return (
        <aside className={`filter-panel ${open ? "open" : ""}`}>
            <div className="filter-header">
                <h3>Categories</h3>
            </div>

            {categories.map((category, index) => (
                <div key={category.name} className="category-item">
                    <div className="category-row">
                        <button
                            className="category-name"
                            onClick={() => selectCategory(category)}
                        >
                            {category.name}
                        </button>

                        {category.subCategories && (
                            <button
                                className={`expand-btn ${expanded === index ? "rotate" : ""}`}
                                onClick={() => toggleCategory(index)}
                            >
                                ▼
                            </button>
                        )}
                    </div>

                    {expanded === index && category.subCategories && (
                        <div className="subcategory-list">
                            {category.subCategories.map((sub) => (
                                <div key={sub.name}>
                                    <button
                                        className="subcategory-row"
                                        onClick={() =>
                                            selectSubCategory(category, sub)
                                        }
                                    >
                                        {sub.name}
                                    </button>

                                    {sub.subSubCategories && (
                                        <div className="subsubcategory-list">
                                            {sub.subSubCategories.map((item) => (
                                                <button
                                                    key={item}
                                                    className="subsubcategory-item"
                                                    onClick={() =>
                                                        selectSubSubCategory(
                                                            category,
                                                            sub,
                                                            item
                                                        )
                                                    }
                                                >
                                                    {item}
                                                </button>
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