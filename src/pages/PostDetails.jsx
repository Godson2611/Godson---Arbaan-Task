import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { api } from "../services/api";
import axios from "axios";

export function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState("");
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  async function fetchPostAndComments() {
    try {
      const [postRes, commentsRes] = await Promise.all([
        api.fetchPost(id),
        axios.get(`${API_BASE_URL}/posts/${id}/comments`),
      ]);
      setPost(postRes);
      setComments(commentsRes.data);
      setEditedBody(postRes.body);
    } catch (error) {
      toast.error("Failed to load post or comments");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const updatedPost = await api.updatePost(id, { body: editedBody });
      setPost(updatedPost);
      setIsEditing(false);
      toast.success("Post updated successfully");
    } catch (error) {
      toast.error("Failed to update post");
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent'></div>
      </div>
    );
  }

  return (
    <>
      <div className='max-w-3xl mx-auto px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white rounded-lg shadow-lg p-6'
        >
          <button
            onClick={() => navigate("/")}
            className='mb-4 text-blue-600 hover:text-blue-800'
          >
            ← Back to Dashboard
          </button>

          <h1 className='text-3xl font-bold mb-6'>{post.title}</h1>

          {isEditing ? (
            <div className='space-y-4'>
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className='w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <div className='flex gap-4'>
                <button
                  onClick={handleSave}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBody(post.body);
                  }}
                  className='px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors'
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className='text-gray-700 leading-relaxed mb-4'>{post.body}</p>
              <button
                onClick={() => setIsEditing(true)}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Edit Post
              </button>
            </div>
          )}
        </motion.div>
      </div>
      <div className='max-w-3xl bg-white rounded-lg shadow-lg mx-auto my-10 p-6'>
        <h2 className='text-2xl font-bold mb-6'>Comments</h2>
        {comments && comments.length > 0 ? (
          <div className='space-y-6 mt-8'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex items-start space-x-4'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-xl'>
                  {comment.email.charAt(0).toUpperCase()}
                </div>
                <div className='flex-1 border-b pb-4'>
                  <h3 className='font-semibold text-lg text-gray-800'>
                    {comment.name}
                  </h3>
                  <p className='text-gray-600 text-sm mb-2'>{comment.email}</p>
                  <p className='text-gray-700 leading-relaxed'>
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>No comments yet.</p>
        )}
      </div>
    </>
  );
}
