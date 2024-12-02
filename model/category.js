const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

// Create the Category model from the schema
const Category = mongoose.model('Category', categorySchema);

// Export the model so it can be used in other files
module.exports = Category;
