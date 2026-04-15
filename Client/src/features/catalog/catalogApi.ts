import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/Product";
import { baseQueryWithErrorhandling } from "../../app/api/baseApi";

export const catalogApi =createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorhandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => ({url: 'product'})
        }),
        fetchProductdetails: builder.query<Product, number>({
            query: (productId) => `product/${productId}`
        })
    })
})

export const {useFetchProductdetailsQuery,useFetchProductsQuery} = catalogApi