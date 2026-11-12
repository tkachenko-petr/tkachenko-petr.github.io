import { contacts } from '../data/contacts'
import { CopyContactButton } from './CopyContactButton'

const contactIcons = {
  telegram: 'M22 3 3 10.5l6.5 2.6m12.5-10.1-4 18-8.5-7.9M22 3 9.5 13.1V19l3.7-2.5',
  email: 'M3 6h18v12H3zM3 7l9 6 9-6',
}

export function ContactSection() {
  return (
    <section id="contacts" className="contacts-section" aria-labelledby="contacts-title" tabIndex={-1}>
      <header className="contacts-heading" data-scroll-reveal>
        <h2 id="contacts-title">Обсудим ваш проект</h2>
        <p className="text-body text-muted">Есть идея сайта или веб-приложения? Напишите мне — обсудим вашу задачу и возможные варианты реализации.</p>
      </header>
      <div className="contacts-grid">
        {contacts.map(contact => {
          const external = contact.channel === 'telegram'
          const linkProps = {
            href: contact.href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noopener noreferrer' : undefined,
          }

          return (
            <article key={contact.channel} className="contact-card" aria-labelledby={`contact-${contact.channel}`} data-scroll-reveal>
              <div className="contact-card-heading">
                <span className="contact-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={contactIcons[contact.channel]} />
                  </svg>
                </span>
                <div>
                  <h3 id={`contact-${contact.channel}`}>{contact.name}</h3>
                  <p className="text-muted">{contact.description}</p>
                </div>
              </div>
              <div className="contact-details">
                <div className="contact-address-row">
                  <a className="contact-address" {...linkProps}>{contact.address}</a>
                  <CopyContactButton address={contact.address} />
                </div>
                <a className="contact-action button button-secondary" {...linkProps}>
                  {contact.action} <span aria-hidden="true">{external ? '↗' : '→'}</span>
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
