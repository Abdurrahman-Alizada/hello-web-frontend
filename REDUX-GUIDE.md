# Frontend Redux Structure

## 📁 File Organization

```
src/
├── redux/
│   ├── reducers/
│   │   ├── auth/
│   │   │   ├── authSlice.ts      # Auth state management
│   │   │   └── authThunk.ts      # Auth API calls
│   │   └── users/
│   │       └── usersThunk.ts     # Users API calls (example)
│   ├── provider/
│   │   └── ReduxProvider.tsx     # Redux provider component
│   ├── baseQuery.ts              # Shared base query config
│   ├── baseUrl.ts                # API base URL
│   └── store.ts                  # Store configuration
├── types/
│   └── auth.ts                   # Auth type definitions
├── hooks/
│   └── useAuth.ts                # Auth hook for components
└── components/
    └── auth/
        ├── LoginForm.tsx         # Login form with Formik
        └── RegisterForm.tsx      # Register form with Formik
```

## 🔧 Usage Examples

### 1. Using Auth in Components

```tsx
import { useAuth } from '@/hooks/useAuth';

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 2. Using Auth API

```tsx
import { useLoginUserMutation } from '@/redux/reducers/auth/authThunk';
import { setUser } from '@/redux/reducers/auth/authSlice';

function LoginForm() {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (credentials) => {
    try {
      const result = await loginUser(credentials).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
}
```

### 3. Adding New Feature API

```tsx
// Create new feature API using shared baseQuery
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/baseQuery';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery, // Reuse shared baseQuery
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
  }),
});
```

### 4. Benefits of Shared baseQuery

- **Consistent auth headers** across all APIs
- **Single configuration** for baseUrl, headers, etc.
- **Easy to modify** - change once, affects all APIs
- **DRY principle** - No repeated configuration

## 🚀 Benefits

- **Direct imports**: No index file confusion
- **Type safety**: Full TypeScript support
- **Easy to extend**: Add new reducers/APIs easily
- **Organized**: Clear separation of concerns
- **Explicit**: Always know where imports come from