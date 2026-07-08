import mongoose from 'mongoose';

const sareeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },
        
        price: {
            type: Number,
            required: true,
            min: 0
        },

        category: {
            type: String,
            required: true,
            enum: ["Handloom", "Cotton", "Batik"]
        },

        subCategory:{
            type:String,
            required:true
        },

        subSubCategory:{
            type:String,
            default:null
        },

        isActive: {
            type: Boolean,
            default: true
        }
    }
);

export default mongoose.model("Saree",sareeSchema);