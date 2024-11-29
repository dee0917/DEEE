"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { 
  IoMusicalNotesOutline, 
  IoTrophyOutline,
  IoSchoolOutline,
  IoHeartOutline,
  IoStarOutline,
  IoRocketOutline,
  IoDiamondOutline
} from "react-icons/io5";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const sections = [
    {
      icon: <IoDiamondOutline className="text-rose-500" />,
      title: "舞蹈專長",
      content: [
        "街舞 / Hip-Hop",
        "現代舞",
        "爵士舞",
        // 根據實際情況添加或修改
      ]
    },
    {
      icon: <IoMusicalNotesOutline className="text-blue-500" />,
      title: "表演經歷",
      content: [
        "專業舞者 10+ 年經驗",
        "多次大型演出編舞",
        "舞蹈教學與工作坊",
        // 根據實際情況添加或修改
      ]
    },
    {
      icon: <IoTrophyOutline className="text-amber-500" />,
      title: "獲獎紀錄",
      content: [
        "全國街舞大賽冠軍",
        "亞洲舞蹈節最佳表演獎",
        "年度最佳編舞獎",
        // 根據實際情況添加或修改
      ]
    },
    {
      icon: <IoSchoolOutline className="text-indigo-500" />,
      title: "教學資歷",
      content: [
        "專業舞蹈工作室指導老師",
        "青少年舞蹈培訓班導師",
        "國際舞蹈認證講師",
        // 根據實際情況添加或修改
      ]
    },
    {
      icon: <IoHeartOutline className="text-green-500" />,
      title: "舞蹈理念",
      content: [
        "透過舞蹈傳遞正能量",
        "推廣舞蹈藝術文化",
        "培育下一代舞者",
        // 根據實際情況添加或修改
      ]
    },
    {
      icon: <IoRocketOutline className="text-purple-500" />,
      title: "未來目標",
      content: [
        "創立個人舞蹈品牌",
        "開設國際舞蹈工作坊",
        "製作原創舞蹈作品",
        // 根據實際情況添加或修改
      ]
    }
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
          
          {/* About Me 視窗 */}
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-[25%] top-[10%] -translate-x-1/2 -translate-y-1/3 z-50
                     w-[300px] h-[450px] md:w-[500px] md:h-[650px]
                     bg-white/80 backdrop-blur-md rounded-3xl shadow-xl
                     flex flex-col overflow-hidden cursor-move"
          >
            {/* 頂部拖動區域 */}
            <div className="absolute top-0 left-0 right-0 h-12 cursor-move" />

            {/* 關閉按鈕 */}
            <button
              onClick={onClose}
              className="absolute right-3 md:right-4 top-3 md:top-4 p-2 rounded-full 
                       hover:bg-gray-100/50 transition-colors duration-200 z-10"
            >
              <IoMdClose size={20} className="text-gray-600" />
            </button>

            {/* 頂部背景裝飾 */}
            <div className="absolute top-0 inset-x-0 h-24 md:h-32 
                          bg-gradient-to-br from-rose-500/20 via-fuchsia-500/20 to-indigo-500/20" />

            {/* 標題區域 */}
            <div className="relative p-4 md:p-8 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full 
                         bg-gradient-to-br from-rose-500 to-indigo-500 shadow-lg 
                         mx-auto mb-3 md:mb-4 flex items-center justify-center text-white"
              >
                <IoDiamondOutline className="text-2xl md:text-4xl" />
              </motion.div>
              <h2 className="text-xl md:text-2xl font-['Montserrat'] font-bold">關於我</h2>
              <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                專業舞者 / 編舞家 / 舞蹈教師
              </p>
            </div>

            {/* 內容區域 - 可滾動 */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/50 rounded-2xl p-4 backdrop-blur-sm
                             hover:bg-white/60 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100/80 
                                    flex items-center justify-center">
                        {section.icon}
                      </div>
                      <h3 className="font-['Montserrat'] font-semibold text-sm md:text-base">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-1.5 md:space-y-2">
                      {section.content.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                          className="text-gray-600 text-sm md:text-base"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* 底部引言 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-4 md:mt-8 text-gray-500 italic text-sm md:text-base"
              >
                "舞蹈不僅是動作，更是一種生活態度"
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 