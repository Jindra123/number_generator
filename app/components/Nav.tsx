'use client'

/* Core */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* Instruments */
import styles from '../styles/layout.module.css'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        Generator
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/history' ? styles.active : ''
        }`}
        href="/history"
      >
        History
      </Link>
    </nav>
  )
}
