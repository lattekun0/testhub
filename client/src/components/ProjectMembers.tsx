import { useState } from 'react'
import { UserPlus, Trash2 } from 'lucide-react'
import type { Project } from '@/types/project'

type Props = {
  project: Project
  isEditable: boolean
}

export default function ProjectMembers({ project, isEditable }: Props) {
  const [newMember, setNewMember] = useState('')

  const handleAdd = () => {
    if (!newMember.trim()) return
    // TODO: call API (addMemberToProject)
    console.log('新增成員:', newMember)
    setNewMember('')
  }

  const handleRemove = (userId: string) => {
    // TODO: call API (removeMemberFromProject)
    console.log('移除成員:', userId)
  }

  return (
    <div className="p-3 flex-1 overflow-y-auto text-sm">
      {/* 成員清單 */}
      <ul className="space-y-2">
        {project.members.map((m) => (
          <li
            key={m.user}
            className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 py-1"
          >
            <span>
              {m.user} <span className="text-gray-500">({m.role})</span>
            </span>
            {isEditable && m.user !== project.owner && (
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemove(m.user)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* 新增成員輸入框 */}
      {isEditable && (
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="輸入使用者 ID"
            className="flex-1 border p-1 rounded dark:bg-[rgba(10,10,10,0.56)]"
          />
          <button
            onClick={handleAdd}
            className="flex items-center px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <UserPlus size={16} className="mr-1" />
            新增
          </button>
        </div>
      )}
    </div>
  )
}
