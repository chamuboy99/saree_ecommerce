import { useEffect, useState } from "react";
import '../styles/editsareemodal.css';
import Swal from "sweetalert2";
import { categories } from "../constants/categories";

export default function EditSareeModal({ editingSaree, showModal, onClose, onUpdated }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        subCategory: "",
        subSubCategory: "",
        description: "",
        isActive: true,
        bestSeller: false,
        image: null
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if(editingSaree){
            setFormData(prev => ({
                ...prev,
                name: editingSaree.name,
                price: editingSaree.price,
                category: editingSaree.category,
                subCategory: editingSaree.subCategory,
                subSubCategory: editingSaree.subSubCategory || "",
                description: editingSaree.description,
                isActive: editingSaree.isActive,
                bestSeller: editingSaree.bestSeller,
                image: editingSaree.image
            }))
        }
    },[editingSaree]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/sarees/${editingSaree._id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!formData.name || !formData.price || !formData.category || !formData.subCategory) {
                return Swal.fire({
                    icon: "warning",
                    title: "Please fill all required fields",
                });
            }

            Swal.fire({
                icon: "success",
                title: "Updated successfully!",
                timer: 1500,
                showConfirmButton: false,
            });

            onUpdated(res.data);
            onClose();

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Update failed",
                text: err.response?.data?.message || "Something went wrong.",
            });
        } finally {
            setSaving(false);
        }
    };

    const selectedCategory = categories.find(
        (category) => category.name === formData.category
    );

    const selectedSubCategory = selectedCategory?.subCategories.find(
        (subcat) => subcat.name === formData.subCategory
    );

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleCategoryChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            category: e.target.value,
            subCategory: "",
            subSubCategory: "",
        }));
    };

    const handleSubCategoryChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            subCategory: e.target.value,
            subSubCategory: "",
        }));
    };

    if(!showModal || !editingSaree) return null;

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <button type="button" onClick={onClose}>X</button>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name"/>
                    <input type="number" name="price" value={Number(formData.price)} onChange={handleChange} placeholder="Price"/>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    <select name="category" value={formData.category} onChange={handleCategoryChange}>
                        { categories.map(category => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))} 
                    </select>
                    <select name="subCategory" value={formData.subCategory} onChange={handleSubCategoryChange}>
                        { selectedCategory?.subCategories.map(subcat => (
                            <option key={subcat.name} value={subcat.name}>{subcat.name}</option>
                        ))}
                    </select>
                    {selectedSubCategory?.subSubCategories && (
                        <select name="subSubCategory" value={formData.subSubCategory} onChange={handleChange}>
                            { selectedSubCategory.subSubCategories.map(i => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    )}
                    <label>
                        <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleChange} />
                        bestSeller
                    </label>
                    <label>
                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                        Active
                    </label>
                    <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}