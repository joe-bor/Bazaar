const Schema = require('mongoose').Schema

const itemSchema = new Schema({ 
    name: { required: true, type: String },
    price: { required: true, type: Number },
    reviews:[{ type: mongoose.Schema.Types.ObjectId, ref:'Review' }],
    description: { required: true, type: String },
    Category: { required: true, type: mongoose.Schema.Types.ObjectId, ref:'Category' }
}, {
    timestamps: true
})

module.exports = itemSchema