import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorhandling = async(args: string | FetchArgs,api: BaseQueryApi,
    extraOption: object) =>{
    api.dispatch(startLoading());
    await sleep();
    const result = await customBaseQuery(args, api, extraOption);
    api.dispatch(stopLoading());
    if(result.error){
        const {status, data} = result.error;
        console.log({status, data})
    }

    return result;
}