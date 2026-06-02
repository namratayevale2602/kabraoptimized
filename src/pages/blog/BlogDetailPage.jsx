// pages/BlogDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser'; // Correct import for html-react-parser
import axiosInstance from '../../service/api';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/blogs/${slug}`);
        
        if (response.data.success) {
          setPost(response.data.data.blog);
          setRelatedPosts(response.data.data.related_posts);
          setError(null);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.data?.message || 'Error loading blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-pink-50/30 to-purple-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5c2c1a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-pink-50/30 to-purple-50/30">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-[#5c2c1a] mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The article you're looking for doesn't exist or has been removed."}</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2 bg-[#5c2c1a] text-white rounded-full hover:bg-amber-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-12 bg-gradient-to-br from-amber-50/30 via-pink-50/30 to-purple-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-[#5c2c1a] hover:text-amber-600 mb-6 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </button>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="px-3 py-1 bg-[#5c2c1a] text-white text-sm rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#5c2c1a] mb-4">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.views} views
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-blog.jpg';
            }}
          />
        </div>

        {/* Content - Using html-react-parser */}
        <div className="prose prose-lg max-w-none mb-10">
          {parse(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-10 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-[#5c2c1a] mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-amber-100 cursor-pointer transition-colors"
                  onClick={() => navigate(`/blog?tag=${tag}`)}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-gray-700 font-medium">Share:</span>
          <button 
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
            className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.092-12.3c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button 
            onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${post.image}&description=${post.title}`, '_blank')}
            className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
            </svg>
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-serif font-bold text-[#5c2c1a] mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/blog/${related.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3 shadow-md">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-blog.jpg';
                      }}
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-[#5c2c1a] mb-1 line-clamp-2 group-hover:text-amber-600">
                    {related.title}
                  </h4>
                  <p className="text-xs text-gray-500">{related.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;