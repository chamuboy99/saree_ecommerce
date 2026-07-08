import { useState } from "react";
import { categories } from "../constants/categories.js";
import '../styles/categoryfilter.css';

export default function CategoryFilter({ open, onFilter }) {
    const [expanded, setExpanded] = useState(null);

    const toggleCategory = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const selectCategory = (category) => {
        if (category.name === "All") {
            onFilter({});
            return;
        }
        onFilter({
            category: category.name
        });
    };

    const selectSubCategory = (category, sub) => {
        onFilter({
            category: category.name,
            subCategory: sub.name
        });
    };

    const selectSubSubCategory = (category, sub, item) => {
        onFilter({
            category: category.name,
            subCategory: sub.name,
            subSubCategory: item
        });
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