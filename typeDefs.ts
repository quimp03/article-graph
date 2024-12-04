import {gql } from "apollo-server-express"
//type => define some fields in model that fe who can get from database
//Query(get), Mutation(add, edit, update, delete)
export const typeDefs = gql` 
    type Article {
        id: String,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }
    type Category {
        id: String,
        title: String,
        avatar: String,
    }
    type Query {
        getListArticle: [Article]
        getArticle(id: String): Article
        getListCategory: [Category]
        getCategory(id: String): Category
    }
    input ArticleInput{
        title: String,
        avatar: String,
        description: String,
        categoryId: String,
    }
    input CategoryInput{
        title: String,
        avatar: String,
    }
    type Mutation {
        createArticle(article: ArticleInput): Article
        deleteArticle(id: String): String
        updateArticle(id: String, article: ArticleInput): Article

        createCategory(category: CategoryInput): Category
        deleteCategory(id: String): String
        updateCategory(id: String, category: CategoryInput): Category
    }
`
   
