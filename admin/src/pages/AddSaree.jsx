import axios from "axios";
import { useState } from "react";
import { categories } from '../constants/categories.js';
import '../styles/addsarees.css';

export default function AddSarees() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        bestSeller: false,
        category: "",
        subCategory: "",
        subSubCategory: "",
        isActive: true,
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if(type === "file"){
            setPreview(URL.createObjectURL(files[0]));
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : type === "file"
                    ? files[0]
                    : value
        }));
    };

    const addSaree = async () => {
        try {
            setLoading(true);
            setError("");
            const data = new FormData();
            const token = localStorage.getItem("token");

            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sarees`, data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            alert(res.data.message);
            setFormData({
                name: "",
                description: "",
                price: "",
                bestSeller: false,
                category: "",
                subCategory: "",
                subSubCategory: "",
                isActive: true,
                image: null
            });
            setPreview(null);
            document.getElementById("image").value = "";
            setSelectedCategory(null);
            setSelectedSubCategory(null);
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setError( err.response.data.message || "Failed to add saree" );
            } else {
                setError("Unable to connect to server");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="add-saree-main">
                <div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={e => {
                            const category = categories.find(i => i.name === e.target.value);
                            setSelectedCategory(category);
                            setSelectedSubCategory(null);
                            setFormData(prev => ({
                                ...prev,
                                category: e.target.value,
                                subCategory: "",
                                subSubCategory: ""
                            }));
                        }}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Sub Category:</label>
                        <select name="subCategory" value={formData.subCategory} onChange={e => {
                            const subCategory = selectedCategory?.subCategories.find(
                                    item => item.name === e.target.value
                                );
                            setSelectedSubCategory(subCategory);
                            setFormData(prev => ({
                                ...prev,
                                subCategory: e.target.value,
                                subSubCategory: ""
                            }));
                        }}>
                            <option value="">Select Sub Category</option>
                            {selectedCategory?.subCategories.map(sub => (
                                <option key={sub.name} value={sub.name}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    { selectedSubCategory?.subSubCategories && (
                        <div>
                            <label>Sub Sub Category:</label>
                            <select name="subSubCategory" value={formData.subSubCategory} onChange={handleChange}>
                                <option value=""> Select Sub Sub Category </option>
                                { selectedSubCategory.subSubCategories.map(item => (
                                    <option key={item} value={item}>{item} </option> 
                                ))}
                            </select>
                        </div>
                           
                    )}
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} rows={1} style={{ resize: "none", overflow: "hidden" }} onChange={e => {
                            handleChange(e);
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`
                        }} />
                    </div>
                    <div className="best-seller-div">
                        <label>Best Seller</label>
                        <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input id="image" type="file" name="image" accept="image/*" onChange={handleChange} />
                    </div>
                    { preview && <img src={preview} width="150" />}
                    { error && <p className="form-error">{error}</p>}
                    <button onClick={() => addSaree()} disabled={loading} className={loading ? "loading" : ""}>{loading ? "Adding Saree..." : "Add Saree"}</button>
                </div>
            </div>
        </>
    );
}