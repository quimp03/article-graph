import Article from "../model/article.model"
import Category from "../model/category.model"
export const resolversAriticle = { //like function controller
    Query : {
        getListArticle: async (_, agrs) => {
            const {
                sortKey,
                sortValue,
                currentPage,
                limitItems,
                filterKey,
                filterValue
            } = agrs
            const find = {
                deleted: false
            }
            //sort
            const sort = {
            }
            if(sortKey && sortValue)
            {
               sort[sortKey] = sortValue
            }
            //end sort
            //pagination
            const skip = (currentPage - 1) * limitItems
            //end pagination

            //filter
            if(filterKey && filterValue){
                find[filterKey] = filterValue
            }
            const articles = await Article.find(find).sort(sort).skip(skip)
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