import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800 mt-4 inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to blog
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Share this article</h2>
        <div className="flex space-x-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Share on LinkedIn
          </a>
        </div>
      </footer>
    </article>
  );
};

export default BlogPost; 