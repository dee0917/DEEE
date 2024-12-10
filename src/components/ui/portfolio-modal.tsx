"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  video: string;
  description: string;
  link: string;
  tags: string[];
}

export function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const categories = ['全部', '舞蹈', '編舞', '表演', '教學'];
  
  const works: WorkItem[] = [
    {
      id: 1,
      title: "街舞編舞作品",
      category: "編舞",
      image: "/images/works/work1.jpg",
      video: "/videos/choreography/work1.mp4",
      description: "融合現代元素的街舞編舞，展現活力與創意",
      link: "https://youtube.com/...",
      tags: ['Hip-Hop', 'Choreography', 'Urban']
    },
    {
      id: 2,
      title: "流行舞蹈教學",
      category: "教學",
      image: "/images/works/work2.jpg",
      video: "/videos/teaching/work2.mp4",
      description: "簡單易學的流行舞蹈教學，適合初學者",
      link: "https://youtube.com/...",
      tags: ['Tutorial', 'Pop Dance', 'Beginner']
    },
    // ... 添加更多作品
  ];

  const filteredWorks = works.filter(work => 
    activeCategory === '全部' || work.category === activeCategory
  );

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
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 
                     w-full md:w-[800px] h-[80vh] md:h-[600px]
                     bg-white rounded-t-[32px] md:rounded-[32px] overflow-hidden
                     shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]
                     md:shadow-[0_0_40px_-15px_rgba(0,0,0,0.2)]"
          >
            {/* 頂部把手和標題區域 */}
            <div className="relative h-14 flex items-center justify-center border-b border-gray-100">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 
                            bg-gray-300/50 rounded-full" />
              <motion.h2 
                className="text-lg font-bold bg-gradient-to-r from-rose-500 to-indigo-600 
                         text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                作品集展示
              </motion.h2>
              <button
                onClick={onClose}
                className="absolute right-4 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* 分類標籤 */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                            transition-all ${
                    activeCategory === category
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* 作品網格 */}
            <div className="px-4 overflow-y-auto h-[calc(100%-110px)]">
              <div className="grid grid-cols-2 gap-3 py-3">
                {filteredWorks.map((work) => (
                  <motion.div
                    key={work.id}
                    layoutId={`work-${work.id}`}
                    onClick={() => setSelectedWork(work)}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-3">
                      <h3 className="text-white font-semibold text-sm leading-tight">{work.title}</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-white/90 text-[10px]">
                          {work.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 作品詳情彈窗 */}
          <AnimatePresence>
            {selectedWork && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                onClick={() => setSelectedWork(null)}
              >
                <motion.div
                  layoutId={`work-${selectedWork.id}`}
                  className="absolute inset-3 bg-white rounded-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-[45vh]">
                    <video
                      src={selectedWork.video}
                      poster={selectedWork.image}
                      controls
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedWork(null)}
                      className="absolute right-3 top-3 bg-black/30 p-2 rounded-full text-white"
                    >
                      <IoMdClose size={20} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{selectedWork.title}</h2>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">{selectedWork.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedWork.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={selectedWork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full flex items-center justify-center px-4 py-2.5 
                               bg-gradient-to-r from-rose-500 to-indigo-600 
                               text-white text-sm font-medium rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      觀看完整作品
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
} 