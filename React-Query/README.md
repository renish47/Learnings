# React-Query

`Query` => requests which fetches the data

`Mutate` => requests which adds/manipulates data

---

##### Installation:

```js
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools //To get a specialised devtool for react query
```

<br/>

##### Basic Setup:

```js
//main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//imports related to React-Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Creating an instance of QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
```

<br/>

##### Get Started

So the basic Syntax for `useQuery` and `useMutation` hook is as follow:

```js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Access the client
const queryClient = useQueryClient();

// Queries
const query = useQuery({ queryKey: ["posts"], queryFn: getPosts });

// Mutations
const mutation = useMutation({
  mutationFn: addPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});
```

<br/> 
This Example will give a clear basic picture of how to use react query `useQuery` and `useMutation` hook.

```js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//sample json data
const POSTS = [
  { id: 1, title: "post1" },
  { id: 2, title: "post2" },
];

function App() {
  const queryClient = useQueryClient(); //context that supplies the instance of the queryClient Created

  //useQuery
  const postsQuery = useQuery({
    queryKey: ["posts"], //Dependency Array (Unique key to identify the query)
    queryFn: () => wait(1000).then(() => [...POSTS]), //Takes a promise as value (Get Executed when this query is initiated)
  });

  //useMutation
  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      // Invalidate and starts refetching
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <div>Loading</div>;

  if (postsQuery.isError)
    return (
      <div>
        Error!! <p>{postsQuery.error.toString()}</p>
      </div>
    );

  return (
    <>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        onClick={() => newPostMutation.mutate("New Post")}
        disabled={newPostMutation.isLoading}
      >
        Add post
      </button>
    </>
  );
}

export default App;

//Pause for testing
function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
```
