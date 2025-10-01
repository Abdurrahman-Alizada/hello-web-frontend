import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/baseQuery';
import { User } from '@/types/auth';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ users: User[] }, void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    getUserById: builder.query<{ user: User }, number>({
      query: (id) => `/users/${id}`,
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation<{ user: User }, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;