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
