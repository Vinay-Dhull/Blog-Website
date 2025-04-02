import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full mb-8 relative group">
          <div className="overflow-hidden rounded-xl shadow-lg">
            {post.featuredImage && (
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                onError={(e) => {
                  e.target.style.display = "none";
                  console.error("Failed to load image:", post.featuredImage);
                }}
              />
            )}
          </div>

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="hover:bg-green-600 transition-colors shadow-md"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="hover:bg-red-600 transition-colors shadow-md"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-black">{post.title}</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-black">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
