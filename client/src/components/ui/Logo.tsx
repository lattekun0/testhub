import { Link } from 'react-router-dom'

type LogoProps = {
  to?: string
  imgSize?: string
  imgSrc?: string
  textSize?: string
  className?: string
}

export default function Logo({
  to = '/',
  imgSize = 'w-12',
  imgSrc = '/login-logo.svg',
  textSize = 'text-3xl',
  className = '',
}: LogoProps) {
  return (
    <Link
      to={to}
      className={`flex items-center w-fit cursor-pointer hover:opacity-80 ${className}`}
    >
      <img src={imgSrc} alt="Logo" className={imgSize} />
      <span className={`ml-2 font-bold ${textSize}`}>TESTHUB</span>
    </Link>
  )
}
