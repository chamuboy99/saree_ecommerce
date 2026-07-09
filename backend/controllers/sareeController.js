import Saree from '../models/sarees.js';

export const addSaree = async (req, res) => {
    try {
        const imageUrl = req.file?.path;

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const sareeData = {
            ...req.body,
            image: imageUrl
        };

        const saree = await Saree.create(sareeData);
        
        res.status(201).json(saree);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllSarees = async (req, res) => {
    try {
        const { category, subCategory, subSubCategory, bestSeller, search } = req.query;
        
        const filter = {
            isActive: true
        }

        if (category) {
            filter.category = category;
        }

        if (subCategory) {
            filter.subCategory = subCategory;
        }

        if (subSubCategory) {
            filter.subSubCategory = subSubCategory;
        }

        if (bestSeller === "true") {
            filter.bestSeller = true;
        }

        // Search filter
        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    subCategory: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    subSubCategory: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const sarees = await Saree.find(filter);
        res.status(200).json(sarees);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getSareeById = async (req, res) => {
    try {
        const saree = await Saree.findById(req.params.id);
        if (!saree || !saree.isActive) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json(saree);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateSaree = async (req, res) => {
    try {
        const saree = await Saree.findById(req.params.id);

        if (!saree || !saree.isActive) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteSaree = async (req, res) => {
    try {
        const deleted = await Saree.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Saree not found" });
        }

        return res.status(200).json({
            message: "Saree deleted successfully",
            data: deleted
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};