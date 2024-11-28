"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { 
  IoPlayCircleOutline, 
  IoStarOutline,
  IoTimeOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoShareSocialOutline
} from "react-icons/io5";
import { useState } from "react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  category: "creation" | "performance";
  featured?: boolean;
}

export function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [activeCategory, setActiveCategory] = useState<"creation" | "performance">("creation");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // 示例視頻數據 - 之後可以替換為實際數據
  const videos: VideoItem[] = [
    {
      id: "1",
      title: "Urban Dance Choreography",
      description: "原創編舞作品，融合現代街舞元素與個人風格...",
      thumbnail: "/thumbnails/dance1.jpg", // 需要替換為實際圖片
      duration: "3:45",
      views: "12.5K",
      likes: "1.2K",
      category: "creation",
      featured: true
    },
    // ... 可以添加更多視頻
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          
          {/* 作品集視窗 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-[15%] top-[10%] -translate-x-1/2 -translate-y-1/2 z-50
                     w-[90vw] max-w-[1200px] h-[80vh] bg-white/80 backdrop-blur-md rounded-3xl shadow-xl
                     flex flex-col overflow-hidden"
          >
            {/* 關閉按鈕 */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 
                       transition-colors duration-200 z-10"
            >
              <IoMdClose size={24} className="text-gray-600" />
            </button>

            {/* 頂部背景裝飾 */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-rose-500/20 via-fuchsia-500/20 to-indigo-500/20" />

            {/* 標題區域 */}
            <div className="relative p-8 text-center">
              <h2 className="text-3xl font-['Montserrat'] font-bold">作品集</h2>
              <p className="text-gray-500 mt-2">探索我的舞蹈世界</p>

              {/* 分類切換 */}
              <div className="flex justify-center gap-4 mt-6">
                <motion.button
                  onClick={() => setActiveCategory("creation")}
                  className={`px-6 py-2 rounded-full font-medium transition-colors
                    ${activeCategory === "creation" 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  舞蹈創作
                </motion.button>
                <motion.button
                  onClick={() => setActiveCategory("performance")}
                  className={`px-6 py-2 rounded-full font-medium transition-colors
                    ${activeCategory === "performance" 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  演出作品
                </motion.button>
              </div>
            </div>

            {/* 視頻網格 */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos
                  .filter(video => video.category === activeCategory)
                  .map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      {/* 視頻卡片 */}
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="relative rounded-2xl overflow-hidden bg-white/50 shadow-lg"
                      >
                        {/* 縮略圖 */}
                        <div className="relative aspect-video">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 
                                        transition-colors duration-300" />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                     text-white/80 hover:text-white"
                          >
                            <IoPlayCircleOutline size={50} />
                          </motion.button>
                          {/* 時長 */}
                          <span className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60
                                         text-white text-sm">
                            {video.duration}
                          </span>
                          {/* 精選標籤 */}
                          {video.featured && (
                            <span className="absolute top-2 left-2 px-3 py-1 rounded-full
                                           bg-rose-500 text-white text-sm font-medium
                                           flex items-center gap-1">
                              <IoStarOutline />
                              精選
                            </span>
                          )}
                        </div>

                        {/* 視頻信息 */}
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-1">{video.title}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2">
                            {video.description}
                          </p>
                          {/* 統計信息 */}
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <IoEyeOutline />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <IoHeartOutline />
                              {video.likes}
                            </span>
                          </div>
                        </div>

                        {/* 懸浮操作按鈕 */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                                      transition-opacity duration-200">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 rounded-full bg-white/80 hover:bg-white
                                     text-gray-600 hover:text-gray-900"
                          >
                            <IoShareSocialOutline size={20} />
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 