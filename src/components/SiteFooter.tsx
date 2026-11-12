import { BrandMark } from './BrandMark'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="identity">
        <BrandMark />
        <div className="identity-copy">
          <span className="identity-name">Ткаченко Пётр</span>
          <span className="identity-role">Веб-разработчик</span>
        </div>
      </div>
      <p className="footer-credit">© {currentYear} Ткаченко Пётр</p>
      <a href="#home" className="footer-top-link">
        Наверх
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </a>
    </footer>
  )
}
