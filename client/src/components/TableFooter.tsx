import type { FC } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TableFooterProps {
  totalItems: number
  itemsPerPage?: number
  currentPage: number
  onPageChange: (page: number) => void
}

const TableFooter: FC<TableFooterProps> = ({
  totalItems,
  itemsPerPage = 15,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalItems === 0) return null

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex items-center justify-between p-3 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)] text-sm">
      {/* 左側空白 */}
      <div></div>

      {/* 中間：結果數量 */}
      <div className="text-center flex-1">共 {totalItems} 個結果</div>

      {/* 右側：分頁 */}
      <div className="flex items-center space-x-2 text-right">
        {totalPages > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span>
              第 {currentPage} / {totalPages} 頁
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TableFooter
