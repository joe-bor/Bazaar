const Schema = require('mongoose').Schema

const itemSchema = new Schema({ 
    name: { require: true, type: String },
    price: { require: true, type: Number },
    reviews:[{ type: mongoose.Schema.Types.ObjectId, ref:'Review' }],
    description: { require: true, type: String },
    Category: { require: true, type: mongoose.Schema.Types.ObjectId, ref:'Category' }
}, {
    timestamps: true
})

module.exports = itemSchema