type ContactDetails = {
  name: string
  description: string
  address: string
  action: string
}

type Contact = ContactDetails & (
  | { channel: 'telegram'; href: `https://t.me/${string}` }
  | { channel: 'email'; href: `mailto:${string}` }
)

export const contacts: readonly Contact[] = [
  {
    channel: 'telegram',
    name: 'Telegram',
    description: 'Для быстрого сообщения',
    address: '@TPLines',
    action: 'Написать в Telegram',
    href: 'https://t.me/TPLines',
  },
  {
    channel: 'email',
    name: 'Email',
    description: 'Для подробного обращения',
    address: 'TPLines@ya.ru',
    action: 'Написать письмо',
    href: 'mailto:TPLines@ya.ru',
  },
]
