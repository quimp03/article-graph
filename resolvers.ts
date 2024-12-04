import Article from "./model/article.model"
import Category from "./model/category.model"
export const resolvers = { //like function controller
    Query : {
        getListArticle: async () => {
            const articles = await Article.find({
                deleted: false
            })
            return articles
        },
        getArticle: async(_,args) => {
           const {id} = args
           const article = await Article.findOne({
                _id: id,
                deleted: false
           })
           return article
        },
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
    Article: {
        category: async(article) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({
                _id: categoryId,
            })
            return category
        }
    },
    Mutation : {
        createArticle: async (_, args) => {
            const {article} = args
            const newArticle = new Article(article)
            await newArticle.save()
            return newArticle
        },
        deleteArticle: async(_, args) => {
            try {
                const {id} = args
                    await Article.updateOne({
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
        updateArticle: async(_, args) => {
            const {id, article} = args
            await Article.updateOne({
                _id: id
            },
                article
            )
            const newArticle = Article.findOne({
                _id: id,
                deleted: false
            })
            return newArticle
        },
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