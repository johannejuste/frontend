import { useContext } from 'react'
import style from '../styles/Navbar.module.css'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'

export default function Navbar() {
  const { logout, userTokens } = useContext(AuthContext)

  return (
    <nav className={style.nav}>
      <Link href="/"><h2><a>LOGO</a></h2></Link>

      <div>
        {userTokens ?

          <div>
            <a onClick={() => logout()}>Logout</a>
          </div>
          :
          <>
            <Link href="/login">
              <a>Sign in</a>
            </Link>
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </>}
      </div>

    </nav>
  )
}