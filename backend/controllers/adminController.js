import Admin from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if(!admin){
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json(token);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}