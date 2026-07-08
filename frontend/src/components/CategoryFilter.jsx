import { useState } from "react";
import { categories } from "../constants/categories.js";

export default function CategoryFilter({ open, onFilter }) {
    const [expanded, setExpanded] = useState(null);

    const toggleCategory = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const selectCategory = (category) => {
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
        <div className="filter-panel">
            <div className="filter-header">
                <h3>Categories</h3>
            </div>

            {categories.map((category, index) => (
                <div key={category.name} className="category-item">
                    <div className="category-row">
                        <span onClick={() => selectCategory(category)}>
                            {category.name}
                        </span>
                        <button onClick={() => toggleCategory(index)}>
                            ▼
                        </button>
                    </div>
                    {expanded === index && (
                        <div className="subcategory-list">
                            {category.subCategories.map(sub => (
                                <div key={sub.name}>
                                    <div className="subcategory-row">
                                        <span onClick={() =>
                                                selectSubCategory(
                                                    category,
                                                    sub
                                                )
                                            }
                                        >
                                            {sub.name}
                                        </span>
                                    </div>
                                    {sub.subSubCategories && (
                                        <div className="subsubcategory-list">
                                            {sub.subSubCategories.map(item => (
                                                <div key={item} onClick={() =>
                                                        selectSubSubCategory(
                                                            category,
                                                            sub,
                                                            item
                                                        )
                                                    }
                                                >
                                                    {item}
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
        </div>
    );
}