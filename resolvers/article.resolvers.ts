import Article from "../model/article.model"
import Category from "../model/category.model"
export const resolversAriticle = { //like function controller
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
        }
    }
}