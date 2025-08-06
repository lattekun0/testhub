import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { useProjectStore } from '@/stores/projectStore'

export default function useLogout() {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      useProjectStore.getState().setProjects([])
      useProjectStore.getState().setCurrentProject(null)
      useAuthStore.getState().setUser(null)
      navigate('/login')
    }
  }

  return logout
}
