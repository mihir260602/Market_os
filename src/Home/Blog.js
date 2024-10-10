// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
// import { fetchContentList } from "../api/contentService";
// import "./Blog.css";

// const Blog = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 5;
//   const navigate = useNavigate(); // Use history for navigation

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const data = await fetchContentList();
//         setBlogData(data.results || []);
//       } catch (error) {
//         setError("Error fetching blog data");
//         console.error("Error fetching blog data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   // const navigateToPost = (blog) => {
//   //   navigate(`/post/${blog.id}/${blog.tags}`, { state: { blog } }); // Navigate to the PostPage and pass the blog data
//   // };

//   const navigateToPost = (blog) => {
//     // console.log(blog); // Log the blog object to check its structure
//     const tags = Array.isArray(blog.tags) ? blog.tags.join(",") : blog.tags; // Ensure it's an array
//     navigate(`/post/${blog.id}/${tags}`, { state: { blog } }); // Navigate to the PostPage and pass the blog data
//   };

//   const totalPages = Math.ceil(blogData.length / blogsPerPage);
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

//   if (loading) {
//     return <p>Loading blog posts...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!Array.isArray(blogData) || blogData.length === 0) {
//     return <p>No blog posts available at the moment.</p>;
//   }

//   return (
//     <section className="blog-section">
//       <h2 className="blog-heading">Latest Blog Posts</h2>
//       <div className="blog-carousel">
//         {currentBlogs.map((blog, index) => (
//           <div
//             key={index}
//             className="blog-card"
//             onClick={() => navigateToPost(blog)}
//           >
//             <h3 className="blog-title">{blog.title}</h3>
//             <div className="blog-meta">
//               <span className="blog-author">{blog.author_name}</span>
//               <span className="blog-date">
//                 {new Date(blog.created_at).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         <button
//           className="page-button"
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="page-info">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="page-button"
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Blog;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { fetchContentList } from "../api/contentService";
import "./Blog.css";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchContentList();
        setBlogData(data.results || []);
      } catch (error) {
        setError("Error fetching blog data");
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const navigateToPost = (blog) => {
    const title = Array.isArray(blog.title) ? blog.title.join(",") : blog.title; 
    navigate(`/post/${blog.id}/${title}`, { state: { blog } });
  };

  const totalPages = Math.ceil(blogData.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  if (loading) return <p>Loading blog posts...</p>;
  if (error) return <p>{error}</p>;
  if (!Array.isArray(blogData) || blogData.length === 0) {
    return <p>No blog posts available at the moment.</p>;
  }

  return (
    <section className="blog-section">
      <h2 className="blog-heading">Latest Blog Posts</h2>
      <div className="blog-carousel">
        {currentBlogs.map((blog, index) => (
          <div
            key={index}
            className="blog-card"
            onClick={() => navigateToPost(blog)}
          >
            <h3 className="blog-title">{blog.title}</h3>
            <div className="blog-meta">
              <span className="blog-author">{blog.author_name}</span>
              <span className="blog-date">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="page-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Blog;
