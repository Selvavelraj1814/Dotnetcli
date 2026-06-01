import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorhandling } from "../../app/api/baseApi";
import {  type CreateOrder, type Order } from "../../app/models/order";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithErrorhandling,
    tagTypes: ['orders'],
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: () => 'orders',
            providesTags: ['orders']
        }),
        fetchOrderDetailed: builder.query<Order, number>({
            query: (id) => ({
                url: `orders/${id}`
            })
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (order) => ({
                url: 'orders',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['orders']
        })
    })
})

export const {useFetchOrdersQuery, useFetchOrderDetailedQuery, useCreateOrderMutation} 
    = orderApi;