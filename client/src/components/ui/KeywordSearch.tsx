import { TextSearch, SearchX } from 'lucide-react'

interface KeywordSearchProps {
  keyword: string
  setKeyword: (value: string) => void
  placeholder?: string
  title?: string
}

export default function KeywordSearch({
  keyword,
  setKeyword,
  placeholder = '關鍵字搜尋',
  title = '重設篩選',
}: KeywordSearchProps) {
  return (
    <div
      className={`flex items-center bg-white dark:bg-[rgb(16,16,16)] transition-all duration-200 rounded
        ${keyword ? 'ring-1 ring-sky-500 bg-sky-100/20 dark:bg-sky-900/30' : ''}
      `}
    >
      <TextSearch size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded text-sm font-bold focus:outline-none focus:ring-1 focus:ring-sky-500"
      />
      <span title={title}>
      <SearchX
        size={20}
        className={`transition-opacity duration-200 ${
          keyword ? 'opacity-100 cursor-pointer' : 'opacity-0'
        }`}
        onClick={() => setKeyword('')}
      />
      </span>
    </div>
  )
}
