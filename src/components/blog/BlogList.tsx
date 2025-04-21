import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

const BlogList: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Password Security Blog</h1>
        <p className="text-xl text-gray-600">
          Expert tips and guides on password security, best practices, and staying safe online.
        </p>
      </header>

      <div className="space-y-12">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <Link to={`/blog/${post.slug}`} className="block group">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                {post.title}
              </h2>
              <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
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
              <p className="text-gray-600 mb-4">{post.description}</p>
              <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                Read more
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList; 