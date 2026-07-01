import mongoose from 'mongoose';

const sareeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        image: {
            type: String
        },

        description: {
            type: String,
            required: true
        },
        
        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: ["type1", "type2", "type3", "type4"]
        },

        isActive: {
            type: Boolean,
            default: true
        }
    }
);

export default mongoose.model("sarees",sareeSchema);