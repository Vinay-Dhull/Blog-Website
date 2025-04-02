import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response && response.documents) {
          setPosts(response.documents);
        } else {
          setPosts([]); // Ensure posts is always an array
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
        setPosts([]);  
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center">
            <p>Loading posts...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center text-red-500">
            <p>{error}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-full md:w-1/2 lg:w-1/3">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center">
              <p>No posts available</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
