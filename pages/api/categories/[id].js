import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categoriesModal'
import auth from '../../../middleware/auth'


connectDB()


export default async (req, res) => {
    switch(req.method){
        case "POST": 
            await updateCategory(req, res)
            break;
        case "GET": 
            await deleteCategory(req, res)
            break;
    }
}

const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const {id} = req.query 
        const {name} = req.body 

        const newCategory = await Categories.findOneAndUpdate({_id: id}, {name})
        res.json({
            msg: "Successfully updated category!",
            category: {
                ...newCategory._doc,
                name
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const {id} = req.query 
        const {name} = req.body 

        await Categories.findByIdAndDelete(id)
        res.json({msg: "Successfully deleted a category!"})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}