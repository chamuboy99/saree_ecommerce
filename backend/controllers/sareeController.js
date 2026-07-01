import Saree from '../models/sarees.js';

export const addSaree = async (req, res) => {
    try {
        const saree = await Saree.create(req.body);
        res.status(201).json({
            success: true,
            message: 'saree added successfully',
            data: saree
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllSarees = async (req, res) => {
    try {
        const sarees = await Saree.find({ isActive: true });
        res.status(200).json(sarees);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}