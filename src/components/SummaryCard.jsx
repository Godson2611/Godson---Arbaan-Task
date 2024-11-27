import { motion } from 'framer-motion';

export function SummaryCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-blue-500">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </motion.div>
  );
}