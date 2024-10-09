import React from "react";
import { useLocation } from "react-router-dom";
import "./PostPage.css"; // Importing the updated CSS
import { getPostImageUrl } from "../api/contentService";

const PostPage = () => {
  const location = useLocation();
  const { blog } = location.state || {}; // Get the passed blog data

  if (!blog) {
    return <p>Blog post not found</p>;
  }

  const downloadContent = () => {
    const blob = new Blob([`Title: ${blog.title}\n\n${blog.content_body}`], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${blog.title}.txt`;
    link.click();
  };

  return (
    <div className="post-page">
      <div className="post-header">
        <h1 className="post-title">{blog.title}</h1>
        <div className="post-meta">
          <p className="post-author">
            <strong>Author:</strong> {blog.author_name}
          </p>
          <p className="post-date">
            <strong>Published on:</strong>{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {blog.banner_image ? (
        <img
          src={getPostImageUrl(blog)}
          alt={blog.title}
          className="post-image"
        />
      ) : (
        <div className="no-image">No Image Available</div>
      )}

      <div className="post-content">{blog.content_body}</div>

      <button className="download-button" onClick={downloadContent}>
        <i className="fas fa-download"></i> Download Article
      </button>
    </div>
  );
};

export default PostPage;
