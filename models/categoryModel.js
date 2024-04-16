const mongoose = require('mongoose')

const categorySchema=mongoose.Schema({

    category_name:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    created_date:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    created_date:{
        type:String,
        required:true
    },
    updated_date:{
        type:String,
        required:true
    }

})

const Category=mongoose.model('Category',categorySchema)
module.exports=Category;