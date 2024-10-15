import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/schema";
import {
  CartTable,
  OrderTable,
  ProductTable,
  UserTable,
} from "../drizzle/schema";
import { CartInput } from "../api/cart/route";
import { to } from "await-to-ts";
import Stripe from "stripe";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const estackApi = createApi({
  reducerPath: "estackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Products", "Users", "Carts", "Orders"],
  endpoints: (builder) => ({
    register: builder.mutation<
      { message: string; role: "admin" | "seller" | "shopper" },
      User
    >({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<
      { message: string; role: "admin" | "seller" | "shopper" },
      Omit<User, "role" | "email">
    >({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation<{ message: string }, unknown>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
        body: {},
      }),
    }),
    getUserProduct: builder.query<Array<ProductTable>, void>({
      query: () => `/api/seller/products`,
      providesTags: ["Products"],
    }),
    deleteProductById: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Products"],
    }),
    getAllUsers: builder.query<Array<UserTable>, void>({
      query: () => `/api/users`,
      providesTags: ["Users"],
    }),
    deleteUserById: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: builder.mutation<{ message: string }, User>({
      query: (user) => ({
        url: "/api/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getAllProduct: builder.query<Array<ProductTable>, void>({
      query: () => `/api/products`,
      providesTags: ["Products"],
    }),
    addItemToCArt: builder.mutation<{ message: string }, CartInput>({
      query: (cart) => ({
        url: "/api/cart",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),
    getCartById: builder.query<Array<CartTable>, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/cart/${id}`,
      }),
      providesTags: ["Carts"],
    }),
    createOrder: builder.mutation<
      { message: string },
      {
        address: string;
        carts: Array<Omit<CartTable, "id" | "key" | "description">>;
      }
    >({
      query: (carts) => ({
        url: "/api/order",
        method: "POST",
        body: carts,
      }),
      invalidatesTags: ["Carts"],
    }),
    deleteCartById: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/cart/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Carts"],
    }),
    updateQuantityByID: builder.mutation<
      { message: string },
      { quantity: number; id: string }
    >({
      query: ({ id, quantity }: { id: string; quantity: number }) => ({
        url: `/api/cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Carts"],
      async onQueryStarted({ id, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          estackApi.util.updateQueryData("getCartById", { id }, (draft) => {
            const index = draft.findIndex((item) => item.id === id);
            if (index !== -1) {
              draft[index].quantity = quantity;
            } else {
              console.error("Cart item not found for optimistic update");
            }
          }),
        );
        const [err] = await to(queryFulfilled);
        if (err) {
          patchResult.undo();
        }
      },
    }),
    createCheckout: builder.mutation<
      Stripe.Response<Stripe.Checkout.Session>,
      { key: Array<string>; name: string; totalAmount: number }
    >({
      query: ({
        key,
        name,
        totalAmount,
      }: {
        key: Array<string>;
        name: string;
        totalAmount: number;
      }) => ({
        url: "/api/create-checkout-session",
        method: "POST",
        body: { key, name, totalAmount },
      }),
    }),
    trackOrder: builder.query<Array<OrderTable>, void>({
      query: () => ({
        url: `/api/order/track`,
      }),
      providesTags: ["Orders"],
    }),
    getSellerOrder: builder.query<Array<OrderTable>, void>({
      query: () => ({
        url: `/api/seller/orders`,
      }),
      providesTags: ["Orders"],
    }),
    shipOrderById: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/seller/orders/shipped`,
        method: "PATCH",
        body: { id },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
