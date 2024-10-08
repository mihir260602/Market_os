// // // // //Blog.js
// // // // import React, { useState } from "react";
// // // // import "./Blog.css";
// // // // import Modal from "./Modal"; // Import the Modal component

// // // // const blogData = [
// // // //   {
// // // //     title: "Latest Advancements in AI Technology",
// // // //     // description: "Explore the cutting-edge innovations.",
// // // //     date: "September 15, 2024",
// // // //     author: "Sarah Connor",
// // // //     image:
// // // //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBMS6rImcXdkTs68Pxt_4mgeHm4aYwDaiOw&sge",
// // // //     category: "Technology",
// // // //     content:
// // // //       "Artificial Intelligence (AI) has made tremendous strides in recent years, fundamentally transforming the landscape of various industries. This article delves into the latest advancements in AI technology, exploring how these innovations are shaping the future. Natural Language Processing (NLP), a subset of AI, has seen remarkable improvements with the advent of advanced algorithms and deep learning techniques. Modern NLP models can understand context, sentiment, and nuances in language, enabling applications such as chatbots, vi",
// // // //   },
// // // //   {
// // // //     title: "The Future of AI in Business",
// // // //     // description: "How AI is transforming modern industries.",
// // // //     date: "October 1, 2024",
// // // //     author: "Jane Doe",
// // // //     image:
// // // //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBMS6rImcXdkTs68Pxt_4mgeHm4aYwDaiOw&s",
// // // //     category: "Business",
// // // //     content: "Full blog content about AI in business...",
// // // //   },
// // // //   {
// // // //     title: "Top Content Strategies for 2024",
// // // //     // description: "Stay ahead with these content marketing trends.",
// // // //     date: "September 28, 2024",
// // // //     author: "John Smith",
// // // //     image:
// // // //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBMS6rImcXdkTs68Pxt_4mgeHm4aYwDaiOw&s",
// // // //     category: "Content",
// // // //     content: "Full blog content about content marketing strategies...",
// // // //   },
// // // //   {
// // // //     title: "Latest Advancements in AI Technology",
// // // //     // description: "Explore the cutting-edge innovations.",
// // // //     date: "September 15, 2024",
// // // //     author: "Sarah Connor",
// // // //     image:
// // // //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBMS6rImcXdkTs68Pxt_4mgeHm4aYwDaiOw&sge",
// // // //     category: "Technology",
// // // //     content:
// // // //       "Artificial Intelligence (AI) has made tremendous strides in recent years, fundamentally transforming the landscape of various industries. This article delves into the latest advancements in AI technology, exploring how these innovations are shaping the future. Natural Language Processing (NLP), a subset of AI, has seen remarkable improvements with the advent of advanced algorithms and deep learning techniques. Modern NLP models can understand context, sentiment, and nuances in language, enabling applications such as chatbots, vi",
// // // //   },
// // // //   {
// // // //     title: "Latest Advancements in AI Technology",
// // // //     // description: "Explore the cutting-edge innovations.",
// // // //     date: "September 15, 2024",
// // // //     author: "Sarah Connor",
// // // //     image:
// // // //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBMS6rImcXdkTs68Pxt_4mgeHm4aYwDaiOw&sge",
// // // //     category: "Technology",
// // // //     content:
// // // //       "Artificial Intelligence (AI) has made tremendous strides in recent years, fundamentally transforming the landscape of various industries. This article delves into the latest advancements in AI technology, exploring how these innovations are shaping the future. Natural Language Processing (NLP), a subset of AI, has seen remarkable improvements with the advent of advanced algorithms and deep learning techniques. Modern NLP models can understand context, sentiment, and nuances in language, enabling applications such as chatbots, vi",
// // // //   },
// // // //   {
// // // //     title: "Latest Advancements in AI Technology",
// // // //     // description: "Explore the cutting-edge innovations.",
// // // //     date: "September 15, 2024",
// // // //     author: "Sarah Connor",
// // // //     image:
// // // //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBMS6rImcXdkTs68Pxt_4mgeHm4aYwDaiOw&sge",
// // // //     category: "Technology",
// // // //     content:
// // // //       "Artificial Intelligence (AI) has made tremendous strides in recent years, fundamentally transforming the landscape of various industries. This article delves into the latest advancements in AI technology, exploring how these innovations are shaping the future. Natural Language Processing (NLP), a subset of AI, has seen remarkable improvements with the advent of advanced algorithms and deep learning techniques. Modern NLP models can understand context, sentiment, and nuances in language, enabling applications such as chatbots, vi",
// // // //   },
// // // //   // Add more blog objects
// // // // ];

// // // // const Blog = () => {
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [selectedBlog, setSelectedBlog] = useState(null); // State to hold the selected blog
// // // //   const blogsPerPage = 3;
// // // //   const totalPages = Math.ceil(blogData.length / blogsPerPage);

// // // //   const currentBlogs = blogData.slice(
// // // //     (currentPage - 1) * blogsPerPage,
// // // //     currentPage * blogsPerPage
// // // //   );

// // // //   const nextPage = () => {
// // // //     setCurrentPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
// // // //   };

// // // //   const prevPage = () => {
// // // //     setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
// // // //   };

// // // //   const openModal = (blog) => {
// // // //     setSelectedBlog(blog); // Set the selected blog
// // // //   };

// // // //   const closeModal = () => {
// // // //     setSelectedBlog(null); // Close the modal
// // // //   };

// // // //   return (
// // // //     <div className="blog-section">
// // // //       <h2 className="blog-heading">Latest from Our Blog</h2>
// // // //       <div className="blog-carousel">
// // // //         {currentBlogs.map((blog, index) => (
// // // //           <div className="blog-card" key={index} onClick={() => openModal(blog)}>
// // // //             <img src={blog.image} alt={blog.title} className="blog-image" />
// // // //             <div className="blog-details">
// // // //               <h3 className="blog-title">{blog.title}</h3>
// // // //               <p className="blog-description">{blog.description}</p>
// // // //               <div className="blog-meta">
// // // //                 <span className="blog-date">{blog.date}</span>
// // // //                 <span className="blog-author">{blog.author}</span>
// // // //               </div>
// // // //               <div className="blog-category">
// // // //                 <span>{blog.category}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //       <div className="pagination">
// // // //         <button className="page-button prev" onClick={prevPage}>
// // // //           Prev
// // // //         </button>
// // // //         <span className="page-info">
// // // //           Page {currentPage} of {totalPages}
// // // //         </span>
// // // //         <button className="page-button next" onClick={nextPage}>
// // // //           Next
// // // //         </button>
// // // //       </div>
// // // //       {/* Render Modal here */}
// // // //       <Modal isOpen={!!selectedBlog} onClose={closeModal} blog={selectedBlog} />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Blog;

// // // import React, { useEffect, useState } from 'react';
// // // import { fetchContentList } from "../api/contentService"; // Use your function here
// // // import './Blog.css'; // Assuming you have a Blog-specific CSS

// // // const Blog = () => {
// // //   const [blogData, setBlogData] = useState([]); // Initialize with empty array
// // //   const [loading, setLoading] = useState(true); // Add a loading state
// // //   const [error, setError] = useState(null); // Add error state

// // //   useEffect(() => {
// // //     const fetchBlogs = async () => {
// // //       try {
// // //         const data = await fetchContentList();
// // //         console.log("Fetched blog data:", data); // Debugging line

// // //         // Access the results array
// // //         setBlogData(data.results || []); // Set blogData to the results array
// // //       } catch (error) {
// // //         setError('Error fetching blog data');
// // //         console.error('Error fetching blog data:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchBlogs();
// // //   }, []);

// // //   if (loading) {
// // //     return <p>Loading blog posts...</p>;
// // //   }

// // //   if (error) {
// // //     return <p>{error}</p>;
// // //   }

// // //   if (!Array.isArray(blogData) || blogData.length === 0) {
// // //     return <p>No blog posts available at the moment.</p>;
// // //   }

// // //   return (
// // //     <section className="blog-section">
// // //       <h2>Latest Blog Posts</h2>
// // //       <div className="blog-list">
// // //         {blogData.slice(0, 5).map((blog, index) => (
// // //           <div key={index} className="blog-item">
// // //             <h3 className="blog-title">{blog.title}</h3>
// // //             <p className="blog-description">{blog.content_body}</p> {/* Use content_body for the description */}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Blog;

// // import React, { useEffect, useState } from 'react';
// // import './Blog.css'; // Assuming you have a Blog-specific CSS
// // import { fetchContentList } from "../api/contentService"; // Use your function here

// // const Blog = () => {
// //   const [blogData, setBlogData] = useState([]); // Initialize with empty array
// //   const [loading, setLoading] = useState(true); // Add a loading state
// //   const [error, setError] = useState(null); // Add error state

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       try {
// //         const data = await fetchContentList();
// //         console.log("Fetched blog data:", data); // Debugging line

// //         // Access the results array
// //         setBlogData(data.results || []); // Set blogData to the results array
// //       } catch (error) {
// //         setError('Error fetching blog data');
// //         console.error('Error fetching blog data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBlogs();
// //   }, []);

// //   if (loading) {
// //     return <p>Loading blog posts...</p>;
// //   }

// //   if (error) {
// //     return <p>{error}</p>;
// //   }

// //   if (!Array.isArray(blogData) || blogData.length === 0) {
// //     return <p>No blog posts available at the moment.</p>;
// //   }

// //   return (
// //     <section className="blog-section">
// //       <h2 className="blog-heading">Latest Blog Posts</h2>
// //       <div className="blog-carousel">
// //         {blogData.slice(0, 5).map((blog, index) => (
// //           <div key={index} className="blog-card">
// //             <h3 className="blog-title">{blog.title}</h3>
// //             <p className="blog-description">{blog.content_body}</p> {/* Use content_body for the description */}
// //             <div className="blog-meta">
// //               <span className="blog-author">{blog.author_name}</span>
// //               <span className="blog-date">{new Date(blog.created_at).toLocaleDateString()}</span>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="pagination">
// //         {/* Add pagination buttons here if needed */}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Blog;

// import React, { useEffect, useState } from 'react';
// import { fetchContentList } from "../api/contentService";
// import './Blog.css';
// import Modal from './Modal'; // Import your Modal component

// const Blog = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedBlog, setSelectedBlog] = useState(null); // State to hold selected blog
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const data = await fetchContentList();
//         setBlogData(data.results || []);
//       } catch (error) {
//         setError('Error fetching blog data');
//         console.error('Error fetching blog data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const openModal = (blog) => {
//     setSelectedBlog(blog); // Set selected blog data
//     setIsModalOpen(true); // Open the modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//     setSelectedBlog(null); // Clear selected blog data
//   };

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
//         {blogData.slice(0, 5).map((blog, index) => (
//           <div key={index} className="blog-card" onClick={() => openModal(blog)}> {/* Open modal on card click */}
//             <h3 className="blog-title">{blog.title}</h3> {/* Display only title initially */}
//             <div className="blog-meta">
//               <span className="blog-author">{blog.author_name}</span>
//               <span className="blog-date">{new Date(blog.created_at).toLocaleDateString()}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Modal isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} /> {/* Render Modal */}
//     </section>
//   );
// };

// export default Blog;

import React, { useEffect, useState } from 'react';
import { fetchContentList } from "../api/contentService";
import './Blog.css';
import Modal from './Modal'; // Import your Modal component

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to hold selected blog
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentPage, setCurrentPage] = useState(1); // State to manage pagination
  const blogsPerPage = 3; // Only 3 blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchContentList();
        setBlogData(data.results || []);
      } catch (error) {
        setError('Error fetching blog data');
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const openModal = (blog) => {
    setSelectedBlog(blog); // Set selected blog data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBlog(null); // Clear selected blog data
  };

  const totalPages = Math.ceil(blogData.length / blogsPerPage); // Calculate total pages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog); // Get blogs for the current page

  if (loading) {
    return <p>Loading blog posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(blogData) || blogData.length === 0) {
    return <p>No blog posts available at the moment.</p>;
  }

  return (
    <section className="blog-section">
      <h2 className="blog-heading">Latest Blog Posts</h2>
      <div className="blog-carousel">
        {currentBlogs.map((blog, index) => (
          <div key={index} className="blog-card" onClick={() => openModal(blog)}>
            <h3 className="blog-title">{blog.title}</h3>
            <div className="blog-meta">
              <span className="blog-author">{blog.author_name}</span>
              <span className="blog-date">{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="page-button" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button className="page-button" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />
    </section>
  );
};

export default Blog;
