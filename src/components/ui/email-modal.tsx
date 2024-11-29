"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { IoMailOutline, IoSendSharp } from "react-icons/io5";
import { useState } from "react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function EmailModal({ isOpen, onClose, email }: EmailModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
    onClose();
  };

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

          {/* 郵件表單 */}
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute left-[2%] top-[10%] -translate-x-1/2 -translate-y-1/3 z-50
                     w-[300px] md:w-[500px] bg-white/80 backdrop-blur-md rounded-3xl shadow-xl
                     cursor-move"
          >
            {/* 頂部拖動區域 */}
            <div className="absolute top-0 left-0 right-0 h-12 cursor-move" />

            <form onSubmit={handleSubmit} className="relative">
              {/* 關閉按鈕 */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 
                         transition-colors duration-200"
              >
                <IoMdClose size={24} className="text-gray-600" />
              </button>

              {/* 標題 */}
              <div className="p-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <IoMailOutline size={24} className="text-rose-500" />
                </div>
                <div>
                  <h2 className="text-xl font-['Montserrat'] font-bold">發送郵件</h2>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>

              {/* 表單內容 */}
              <div className="px-6 pb-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">主旨</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/50 border border-gray-200
                             focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500
                             transition-all duration-200"
                    placeholder="請輸入郵件主旨"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">內容</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-2 rounded-xl bg-white/50 border border-gray-200
                             focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500
                             transition-all duration-200 resize-none"
                    placeholder="請輸入郵件內容"
                  />
                </div>
              </div>

              {/* 發送按鈕 */}
              <div className="px-6 pb-6">
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-xl font-medium
                           hover:bg-gray-800 transition-colors duration-200
                           flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IoSendSharp />
                  發送郵件
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 