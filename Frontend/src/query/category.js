import {gql} from '@apollo/client';

export const GETCATEGORIES=gql`
    query getCategories(
      $categoryName: String, 
      $slug: String, 
      $description: String, 
      $isActive: Boolean
    ){
      getCategories(
        categoryName: $categoryName, 
        slug: $slug, 
        description: $description, 
        isActive: $isActive
      ){
          id
          categoryName
          slug
          categoryImage
          description
          isActive 
          createdAt  
      }
    }
`;

export const ADDCATEGORY = gql`
  mutation addCategory(
    $categoryName: String!
    $slug: String!
    $categoryImage: String!
    $description: String!
    $isActive: Boolean
  ) {
    addCategory(
      categoryName: $categoryName
      slug: $slug
      categoryImage: $categoryImage
      description: $description
      isActive: $isActive
    ) {
      message
      category {
        id
        categoryName
        slug
      }
    }
  }
`;

export const UPDATECATEGORY = gql`
  mutation editCategory(
    $id:ID
    $categoryName: String!
    $slug: String!
    $categoryImage: String!
    $description: String!
    $isActive: Boolean
  ) {
    editCategory(
      id:$id
      categoryName: $categoryName
      slug: $slug
      categoryImage: $categoryImage
      description: $description
      isActive: $isActive
    ) {
      message
      category {
        categoryName
        slug
      }
    }
  }
`;

export const UPDATECATEGORYSTATUS = gql`
  mutation updateCategoryStatus($id: ID!) {
    updateCategoryStatus(id: $id) {
      message
    }
  }
`;