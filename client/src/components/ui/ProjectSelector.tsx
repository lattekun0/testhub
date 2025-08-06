import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { Button } from '@/components/ui/button'

export const ProjectSelector = () => {
  const { currentProject, projects, setCurrentProject } = useProjectStore()

  const handleSelect = (project: typeof currentProject) => {
    setCurrentProject(project)
    localStorage.setItem('currentProjectId', project!._id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="nav" className="w-40 justify-between">
          {currentProject?.name || 'Projects'}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Array.isArray(projects) &&
          projects.map((project) => (
            <DropdownMenuItem
              key={project._id}
              onClick={() => handleSelect(project)}
              className={project._id === currentProject?._id ? 'font-bold' : ''}
            >
              {project.name}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
