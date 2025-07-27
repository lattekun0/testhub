import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center w-fit mb-6 cursor-pointer hover:opacity-80">
      <img src="/logo.svg" alt="Logo" className="w-12" />
      <span className="ml-2 text-3xl font-bold">TESTHUB</span>
    </Link>
  )
}
