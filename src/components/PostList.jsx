import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export function PostList({ posts, onDelete }) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <Link 
              to={`/post/${post.id}`}
              className="text-lg font-medium hover:text-blue-600 transition-colors"
            >
              {post.title}
            </Link>
            <div className="flex gap-2">
              <Link
                to={`/post/${post.id}`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <PencilIcon className="w-5 h-5" />
              </Link>
              <button
                onClick={() => onDelete(post.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}