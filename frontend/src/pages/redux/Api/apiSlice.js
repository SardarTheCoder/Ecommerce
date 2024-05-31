import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../Constants";



const baseQuery = fetchBaseQuery({baseUrl:BASE_URL});

export const apiSlice =createApi({
    baseQuery,
    tagTypes:["Product","Order","User","Category"],
    endpoints:()=>({}),
})