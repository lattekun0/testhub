import { NavLink, useMatch, useResolvedPath } from 'react-router-dom'
import { cn } from '@/lib/utils'

type SidebarLinkProps = {
  to: string
  name: string
  icon: React.ElementType
  collapsed: boolean
}

export function SidebarLink({ to, name, icon: Icon, collapsed }: SidebarLinkProps) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <NavLink
      to={to}
      className={cn(
        'group relative flex items-center gap-3 px-3 py-2 rounded text-sm font-bold transition-colors',
        'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        'text-zinc-700 dark:text-zinc-300',
        match && 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white',
        match &&
          'before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:rounded-sm before:bg-cyan-400'
      )}
      aria-current={match ? 'page' : undefined}
    >
      <Icon
        size={20}
        className={cn(
          'transition-colors duration-150',
          'text-muted-foreground dark:text-cyan-400',
          'group-hover:text-cyan-400',
          'dark:group-hover:text-white'
        )}
      />
      {!collapsed && <span>{name}</span>}
    </NavLink>
  )
}
