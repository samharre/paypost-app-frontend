import { createContext, useContext, useEffect, useState } from "react";

import { getApiRequest } from "../services/api";
import { AuthContext } from "./AuthContext";

export const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    async function getPosts() {
      try {
        const api = getApiRequest();

        const response = await api.get('posts');

        setPosts(response.data.posts);
      } catch (err) {
        console.log('error: ', err);
      }
    }

    if (isAuthenticated) {
      getPosts()
    }
  }, [isAuthenticated]);

  async function createPost(data) {

    const api = getApiRequest();

    const response = await api.post('posts', data);

    const newPosts = [...posts, response.data]
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    setPosts(newPosts)

    return response.data;

  }

  return (
    <PostsContext.Provider value={{
      posts,
      createPost
    }}>
      {children}
    </PostsContext.Provider>
  );
};