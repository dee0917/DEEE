import React, { useMemo } from 'react'

interface ReviewMarqueeProps {
  reverse?: boolean
}

const allReviews = [
  {
    name: "Git大師",
    username: "@git_master",
    content: "這個表演簡直是 master branch 等級！🔥",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    name: "程式碼農夫",
    username: "@code_farmer",
    content: "這舞姿比我的代碼還要優雅 commit一下！",
    gradient: "from-purple-400 to-indigo-400"
  },
  {
    name: "Bug終結者",
    username: "@bug_killer",
    content: "這個表演零 bug！根本就是 production ready 💯",
    gradient: "from-amber-400 to-orange-400"
  },
  {
    name: "全端工程師",
    username: "@fullstack_dev",
    content: "前後台都完美！這就是 full stack 的實力～",
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    name: "資深碼農",
    username: "@senior_dev",
    content: "這個效能優化得太好了！根本是 O(1) 等級",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    name: "Docker狂熱者",
    username: "@docker_fan",
    content: "這個容器打包得也太完美了吧！",
    gradient: "from-violet-400 to-purple-400"
  },
  {
    name: "開源達人",
    username: "@open_source",
    content: "這個表演應該開源！讓大家都能學習",
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    name: "前端小精靈",
    username: "@frontend_elf",
    content: "UI/UX 完美！這個動畫效果太強了",
    gradient: "from-red-400 to-pink-400"
  },
  {
    name: "後端大佬",
    username: "@backend_boss",
    content: "架構設計太完美了！值得 code review",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    name: "算法王者",
    username: "@algo_king",
    content: "這個演算法最佳化得太漂亮了！",
    gradient: "from-cyan-400 to-blue-400"
  }
]

export default function ReviewMarquee({ reverse }: ReviewMarqueeProps) {
  // 使用 useMemo 來隨機打亂所有評論的順序，但只打亂一次
  const shuffledReviews = useMemo(() => {
    const shuffled = [...allReviews]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  return (
    <div className="relative flex overflow-hidden">
      <div 
        className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
      >
        {/* 只重複兩次，確保無縫循環 */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3 px-3">
            {shuffledReviews.map((review, index) => (
              <div
                key={`${i}-${index}`}
                className="w-[180px] bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${review.gradient} animate-pulse-slow`} />
                  <div>
                    <div className="font-medium text-xs">{review.name}</div>
                    <div className="text-gray-500 text-xs">{review.username}</div>
                  </div>
                </div>
                <p className="mt-1 text-gray-700 text-xs line-clamp-2">{review.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
} 