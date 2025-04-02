import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      image: null,
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setIsSubmitting(true);
    setError("");
    try {
      if (post) {
        // Update existing post
        let fileId = post.featuredImage;

        if (data.image && data.image[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            await appwriteService.deleteFile(post.featuredImage);
            fileId = file.$id;
          }
        }

        const updatedPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: fileId,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        } else {
          throw new Error("Failed to update post");
        }
      } else {
        // Create new post
        if (!data.image || !data.image[0]) {
          throw new Error("Featured image is required");
        }

        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) throw new Error("Failed to upload image");

        const newPost = await appwriteService.createPost({
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: file.$id,
          userId: userData.$id,
          slug: data.slug,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        } else {
          throw new Error("Failed to create post");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-2xl font-bold text-white">
              {post ? "Edit Post" : "Create New Post"}
            </h2>
          </div>

          <form onSubmit={handleSubmit(submit)} className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Input
                  label="Title"
                  placeholder="Enter post title"
                  error={errors.title}
                  {...register("title", { required: "Title is required" })}
                />
                <Input
                  label="Slug"
                  placeholder="Post slug will be generated automatically"
                  error={errors.slug}
                  {...register("slug", { required: "Slug is required" })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
                <RTE
                  label="Content"
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    error={errors.image}
                    {...register("image", {
                      required: !post && "Featured image is required",
                    })}
                  />
                  {post && post.featuredImage && (
                    <div className="mt-4">
                      <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg w-full h-48 object-cover border border-gray-200"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Current featured image
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Select
                    options={["active", "inactive"]}
                    label="Post Status"
                    error={errors.status}
                    {...register("status", { required: "Status is required" })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : post ? (
                    "Update Post"
                  ) : (
                    "Publish Post"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
