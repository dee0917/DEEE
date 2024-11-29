"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { 
  IoPlayCircleOutline, 
  IoStarOutline,
  IoTimeOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoShareSocialOutline,
  IoDiamondOutline,
  IoVideocamOutline
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
            drag
            dragMomentum={false}
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-[2%] top-[10%] -translate-x-1/2 -translate-y-1/3 z-50
                     w-[90vw] md:w-[80vw] max-w-[1200px] h-[80vh] 
                     bg-white/80 backdrop-blur-md rounded-3xl shadow-xl
                     flex flex-col overflow-hidden cursor-move"
          >
            {/* 頂部拖動區域 */}
            <div className="absolute top-0 left-0 right-0 h-12 cursor-move" />

            {/* 精簡的頂部區域 */}
            <div className="relative p-4 flex items-center justify-between border-b border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-indigo-500 
                             flex items-center justify-center text-white">
                  <IoVideocamOutline className="text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-['Montserrat'] font-bold">作品集</h2>
                  <p className="text-sm text-gray-500">探索我的舞蹈世界</p>
                </div>
              </div>

              {/* 分類切換 */}
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setActiveCategory("creation")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${activeCategory === "creation" 
                      ? "bg-gradient-to-r from-rose-500 to-indigo-500 text-white" 
                      : "bg-white/50 text-gray-600 hover:bg-white/80"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  舞蹈創作
                </motion.button>
                <motion.button
                  onClick={() => setActiveCategory("performance")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${activeCategory === "performance" 
                      ? "bg-gradient-to-r from-rose-500 to-indigo-500 text-white" 
                      : "bg-white/50 text-gray-600 hover:bg-white/80"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  演出作品
                </motion.button>
              </div>

              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100/50 
                         transition-colors duration-200"
              >
                <IoMdClose size={20} className="text-gray-600" />
              </button>
            </div>

            {/* 視頻網格 - 更大的顯示區域 */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos
                  .filter(video => video.category === activeCategory)
                  .map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative aspect-video"
                    >
                      {/* 視頻卡片 */}
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="relative h-full rounded-2xl overflow-hidden bg-white/50 shadow-lg
                                 hover:shadow-xl transition-all duration-300"
                      >
                        {/* 縮略圖 */}
                        <div className="relative h-full">
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

                          {/* 視頻信息 - 懸浮時顯示 */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t 
                                        from-black/60 to-transparent opacity-0 group-hover:opacity-100
                                        transition-opacity duration-300">
                            <h3 className="text-white font-medium mb-1">{video.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-white/80">
                              <span className="flex items-center gap-1">
                                <IoEyeOutline />
                                {video.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <IoHeartOutline />
                                {video.likes}
                              </span>
                              <span>{video.duration}</span>
                            </div>
                          </div>

                          {/* 精選標籤 */}
                          {video.featured && (
                            <span className="absolute top-2 left-2 px-2 py-1 rounded-full
                                           bg-rose-500 text-white text-xs font-medium
                                           flex items-center gap-1">
                              <IoStarOutline />
                              精選
                            </span>
                          )}
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