const mongoose=require('mongoose')

const subCatSchema=mongoose.Schema({
    category_id:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCat_name:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true
    },
    created_date:{
        type:String,
        required:true,
    },
    updated_date:{
        type:String,
        required:true,
    }
})

const SubCategory=mongoose.model('SubCategory',subCatSchema);
module.exports=SubCategory;