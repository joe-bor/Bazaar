const Schema = require('mongoose').Schema

const itemSchema = new Schema({ 
    name: { 
        required: true, 
        type: String, 
        set: function(value){
            let split = value.split(' ')
            if (split.length === 1) return value.charAt(0).toUpperCase() + value.slice(1)

            split.forEach((string, index, array) => { array[index] = string.charAt(0).toUpperCase() + string.slice(1)})
            let toString = split.toString().replaceAll(',', ' ')
            return toString
        } 
    },
    price: { 
        required: true, 
        type: Number, 
        set: function(value){
            return Math.round(value * 100) / 100 
        } 
    },
    reviews:[{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Review' 
    }],
    description: { 
        required: true, 
        type: String 
    },
    category: { 
        required: true, 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Category' }
}, {
    timestamps: true
}) 

module.exports = itemSchema