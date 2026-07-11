import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    link:new HttpLink({
        uri:"http://localhost:4100/graphql",
        credentials:"include"
    }),
    cache:new InMemoryCache()
})