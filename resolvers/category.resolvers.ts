import Category from "../model/category.model"
export const resolversCategory = { //like function controller
    Query : {
        getListCategory: async(_, args) => {
            const {id} = args
            const categories = await Category.find({
                deleted: false
            })
            return categories
        },
        getCategory: async(_,args) => {
            const {id} = args
            const category = await Category.findOne({
                 _id: id,
                 deleted: false
            })
            return category
         }
    },
    Mutation : {
        createCategory: async (_, args) => {
            const {category} = args
            const newCategory = new Category(category)
            await newCategory.save()
            return newCategory
        },
        deleteCategory: async(_, args) => {
            try {
                const {id} = args
                    await Category.updateOne({
                        _id: id
                    },
                    {
                        deleted: true,
                        deletedAt: new Date()
                    }
                )
            } catch (error) {
                console.log(error)
            }
           return "Delete successfully"
        },
        updateCategory: async(_, args) => {
            const {id, category} = args
            await Category.updateOne({
                _id: id
            },
                category
            )
            const newCategory = Category.findOne({
                _id: id,
                deleted: false
            })
            return newCategory
        }
    }
}