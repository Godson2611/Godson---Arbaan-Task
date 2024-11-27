import { useState, useEffect } from 'react';
import { DocumentTextIcon, ChatBubbleLeftIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { SummaryCard } from '../components/SummaryCard';
import { PostList } from '../components/PostList';
import { StatsChart } from '../components/StatsChart';

export function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [summaryData, postsData] = await Promise.all([
        api.fetchSummary(),
        api.fetchPosts()
      ]);
      setSummary(summaryData);
      setPosts(postsData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin-slow">
          <DocumentTextIcon className="w-12 h-12 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Posts"
            value={summary.posts}
            icon={DocumentTextIcon}
          />
          <SummaryCard
            title="Total Comments"
            value={summary.comments}
            icon={ChatBubbleLeftIcon}
          />
          <SummaryCard
            title="Total Todos"
            value={summary.todos}
            icon={ClipboardDocumentListIcon}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <StatsChart data={summary} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <PostList posts={posts} onDelete={handleDelete} />
        </div>
      </motion.div>
    </div>
  );
}