"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getYouTubeVideoInfo, getYouTubeVideoId } from "@/lib/youtube";

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

export default function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [works, setWorks] = useState<WorkItem[]>([
    {
      id: 1,
      title: "載入中...",
      category: "教學",
      image: "https://i.ytimg.com/vi/w4yU6j33WNE/hqdefault.jpg",
      video: "https://www.youtube.com/embed/w4yU6j33WNE",
      description: "載入中...",
      link: "https://youtube.com/shorts/w4yU6j33WNE?feature=share",
      tags: ['教學', 'DEE']
    },
    {
      id: 2,
      title: "載入中...",
      category: "教學",
      image: "https://i.ytimg.com/vi/PfFTFox4bKU/hqdefault.jpg",
      video: "https://www.youtube.com/embed/PfFTFox4bKU",
      description: "載入中...",
      link: "https://youtube.com/shorts/PfFTFox4bKU?feature=share",
      tags: ['教學', 'DEE']
    },
    {
      id: 3,
      title: "載入中...",
      category: "教學",
      image: "https://i.ytimg.com/vi/3Zl15c2SUDA/hqdefault.jpg",
      video: "https://www.youtube.com/embed/3Zl15c2SUDA",
      description: "載入中...",
      link: "https://youtube.com/shorts/3Zl15c2SUDA?feature=share",
      tags: ['教學', 'DEE']
    },
    {
      id: 4,
      title: "載入中...",
      category: "教學",
      image: "https://i.ytimg.com/vi/IuG_2p1rr_s/hqdefault.jpg",
      video: "https://www.youtube.com/embed/IuG_2p1rr_s",
      description: "載入中...",
      link: "https://youtube.com/shorts/IuG_2p1rr_s?feature=share",
      tags: ['教學', 'DEE']
    },
    {
      id: 5,
      title: "載入中...",
      category: "教學",
      image: "https://i.ytimg.com/vi/fFSUimSZNps/hqdefault.jpg",
      video: "https://www.youtube.com/embed/fFSUimSZNps",
      description: "載入中...",
      link: "https://youtube.com/shorts/fFSUimSZNps?feature=share",
      tags: ['教學', 'DEE']
    },
    {
      id: 6,
      title: "載入中...",
      category: "教學",
      image: "https://i.ytimg.com/vi/ocDYXJOCUtA/hqdefault.jpg",
      video: "https://www.youtube.com/embed/ocDYXJOCUtA",
      description: "載入中...",
      link: "https://youtube.com/shorts/ocDYXJOCUtA?feature=share",
      tags: ['教學', 'DEE']
    }
  ]);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      const videoUrls = [
        "https://youtube.com/shorts/w4yU6j33WNE?feature=share",
        "https://youtube.com/shorts/PfFTFox4bKU?feature=share",
        "https://youtube.com/shorts/3Zl15c2SUDA?feature=share",
        "https://youtube.com/shorts/IuG_2p1rr_s?feature=share",
        "https://youtube.com/shorts/fFSUimSZNps?feature=share",
        "https://youtube.com/shorts/ocDYXJOCUtA?feature=share"
      ];

      const initialWorks = videoUrls.map((url, index) => ({
        id: index + 1,
        title: "載入中...",
        category: "教學",
        image: `https://i.ytimg.com/vi/${getYouTubeVideoId(url)}/hqdefault.jpg`,
        video: `https://www.youtube.com/embed/${getYouTubeVideoId(url)}`,
        description: "載入中...",
        link: url,
        tags: ['教學', 'DEE']
      }));

      setWorks(initialWorks);

      const updatedWorks = await Promise.all(
        videoUrls.map(async (url, index) => {
          const videoId = getYouTubeVideoId(url);
          if (!videoId) return initialWorks[index];

          const info = await getYouTubeVideoInfo(videoId);
          if (!info.success) return initialWorks[index];

          return {
            ...initialWorks[index],
            title: `【教學】DEE-${info.title}`,
            description: info.description
          };
        })
      );

      setWorks(updatedWorks);
    };

    fetchVideoInfo();
  }, []);

  const categories = ['全部', '舞蹈', '編舞', '表演', '教學'];
  
  const filteredWorks = works.filter(work => 
    activeCategory === '全部' ? true : work.category === activeCategory
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-6xl my-8 text-left align-middle transition-all transform">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IoMdClose size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                作品集
              </h2>

              {/* 分類標籤 */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${
                        activeCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* 作品網格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorks.map((work) => (
                  <div
                    key={work.id}
                    className="group relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedWork(work)}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                        {work.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 作品詳情模態框 */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* 關閉按鈕 */}
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IoMdClose size={24} />
            </button>

            <div className="p-6">
              {/* 影片標題 */}
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {selectedWork.title}
              </h2>

              {/* 影片播放器 */}
              <div className="relative pb-[56.25%] h-0 mb-6">
                <iframe
                  src={selectedWork.video}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* 標籤 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedWork.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 描述 */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {selectedWork.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 