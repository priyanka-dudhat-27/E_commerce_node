module.exports.dashboard=async(req,res)=>{
    try {
        return res.render('dashboard')
    } catch (error) {
        console.log(error);
    }
}
module.exports.add_admin=async(req, res)=>{
    try {
        return res.render('add_admin')
    } catch (error) {
        console.log(error);
    }
}