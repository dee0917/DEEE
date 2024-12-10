"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { 
  IoStarOutline, 
  IoTrophyOutline,
  IoVideocamOutline,
  IoPersonOutline,
  IoMusicalNotesOutline,
  IoDiamondOutline,
  IoTvOutline,
  IoImageOutline
} from "react-icons/io5";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const sections = [
    {
      icon: <IoPersonOutline className="text-blue-500" />,
      title: "個人資料",
      content: [
        "身高: 178公分",
        "體重: 75公斤",
        "三圍: 38/33/39",
        "肩寬: 53公分",
        "鞋號: 9US",
        "生日: 1990/09/17"
      ]
    },
    {
      icon: <IoDiamondOutline className="text-rose-500" />,
      title: "專業領域",
      content: [
        "街舞 / 歌唱 / 戲劇",
        "舞團: XOXO Dance Group",
        "HipHop / StreetJazz / FreeStyle",
        "專業舞者 / 編舞家 / 演員"
      ]
    },
    {
      icon: <IoStarOutline className="text-amber-500" />,
      title: "演唱會經歷",
      content: [
        "2024 王心凌世界巡迴演唱會",
        "2019 李玟COCO世界巡迴演唱會",
        "2019 米津玄師巡演台北站",
        "2018 鍾漢良巡迴演唱會",
        "2018 VAVA台北有嘻哈"
      ]
    },
    {
      icon: <IoTrophyOutline className="text-purple-500" />,
      title: "重要演出",
      content: [
        "2019 金曲獎蔡依林舞者",
        "2019 紅白藝能大賞",
        "2019 Nike春/秋季發表模特",
        "2018 中國新舞林大會",
        "2017 金鐘獎編排老師"
      ]
    },
    {
      icon: <IoMusicalNotesOutline className="text-green-500" />,
      title: "合作藝人",
      content: [
        "蔡依林 / 王心凌 / 楊丞琳",
        "鄭秀文 / 容祖兒 / 李玟",
        "羅志祥 / 曹政奭 / 米津玄師"
      ]
    },
    {
      icon: <IoVideocamOutline className="text-indigo-500" />,
      title: "影視作品",
      content: [
        "電影《乳房》",
        "電視劇《幸福的理由》",
        "廣告《德恩堂眼鏡》",
        "廣告《灌籃高手手遊》"
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
                陳亞棣 DEECHEN
              </motion.h2>
              <button
                onClick={onClose}
                className="absolute right-4 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* 內容區域 - 可滾動 */}
            <div className="overflow-y-auto h-[calc(100%-56px)]">
              {/* 個人簡介 */}
              <div className="px-4 py-3 text-center">
                <p className="text-sm text-gray-500">
                  專業舞者 / 編舞家 / 演員
                </p>
              </div>

              {/* 資訊卡片網格 */}
              <div className="px-4 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-gray-50/50 rounded-2xl p-4 backdrop-blur-sm
                               hover:bg-white/60 transition-all duration-200
                               hover:shadow-lg hover:shadow-rose-500/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white 
                                      flex items-center justify-center shadow-sm">
                          {section.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800">
                          {section.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {section.content.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                            className="text-gray-600 text-sm"
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
                  className="text-center mt-6 text-gray-500 italic text-sm"
                >
                  "舞蹈是我的生命，表演是我的熱情"
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 