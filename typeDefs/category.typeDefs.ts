import {gql } from "apollo-server-express"
//type => define some fields in model that fe who can get from database
//Query(get), Mutation(add, edit, update, delete)
export const typeDefsCategory = gql` 
    type Category {
        id: String,
        title: String,
        avatar: String,
    }
    type Query {
        getListCategory: [Category]
        getCategory(id: String): Category
    }
    input CategoryInput{
        title: String,
        avatar: String,
    }
    type Mutation {
        createCategory(category: CategoryInput): Category
        deleteCategory(id: String): String
        updateCategory(id: String, category: CategoryInput): Category
    }
`
   
