import { useEffect, useRef, useState } from 'react'

type CopyStatus = 'idle' | 'pending' | 'copied' | 'error'

export function CopyContactButton({ address }: { address: string }) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const resetTimer = useRef<number | undefined>(undefined)
  const copied = status === 'copied'
  const failed = status === 'error'

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  async function copyAddress() {
    if (status === 'pending') return

    window.clearTimeout(resetTimer.current)
    setStatus('pending')

    try {
      await navigator.clipboard.writeText(address)
      setStatus('copied')
      resetTimer.current = window.setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        type="button"
        className="contact-copy-button"
        aria-label={`Скопировать ${address}`}
        aria-disabled={status === 'pending' || undefined}
        onClick={copyAddress}
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {copied ? <path d="m5 12 4 4L19 6" /> : <path d="M8 8h12v12H8zM16 4H4v12" />}
        </svg>
        {copied ? 'Скопировано' : 'Скопировать'}
      </button>
      <p className={failed ? 'contact-copy-error' : 'sr-only'} role="status" aria-atomic="true">
        {failed ? 'Не удалось скопировать адрес. Его можно выделить и скопировать вручную.' : copied ? `Скопировано: ${address}` : ''}
      </p>
    </>
  )
}
