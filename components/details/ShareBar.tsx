
"use client"
import React, { useState } from 'react'
import styles from './detailsblog.module.css'
import { FaLinkedin, FaFacebookF } from 'react-icons/fa'
import { FiCopy, FiScissors } from 'react-icons/fi'

export default function ShareBar() {
  const [copied, setCopied] = useState(false)

  function handleShare(provider: 'linkedin' | 'facebook') {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const encoded = encodeURIComponent(url)
    const titleEnc = encodeURIComponent(document.title || '')

    if (provider === 'linkedin') {
      const link = `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${titleEnc}`
      window.open(link, '_blank', 'noopener,noreferrer')
      return
    }

    if (provider === 'facebook') {
      const link = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`
      window.open(link, '_blank', 'noopener,noreferrer')
      return
    }
  }

  async function handleCopyLink() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        const ta = document.createElement('textarea')
        ta.value = url
        ta.setAttribute('readonly', '')
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className={styles.shareBar}>
      <div className={styles.shareLabel}>
        {/* share icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.shareIcon} aria-hidden>
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <path d="M8.59 13.51L15.42 8.49"></path>
        </svg>
        <span>Share this article</span>
      </div>

      <div className={styles.shareButtons}>
        <button
          type="button"
          aria-label="Split"
          className={`${styles.btn} ${styles.social}`}
          onClick={() => { /* placeholder: implement split behaviour if needed */ }}
        >
          <FiScissors className={styles.btnIcon} />
          <span>Split</span>
        </button>

        <button
          type="button"
          aria-label="Share on LinkedIn"
          className={`${styles.btn} ${styles.social}`}
          onClick={() => handleShare('linkedin')}
        >
          <FaLinkedin className={styles.btnIcon} />
          <span>LinkedIn</span>
        </button>

        <button
          type="button"
          aria-label="Share on Facebook"
          className={`${styles.btn} ${styles.social}`}
          onClick={() => handleShare('facebook')}
        >
          <FaFacebookF className={styles.btnIcon} />
          <span>Facebook</span>
        </button>

        <button
          type="button"
          aria-label="Copy link"
          className={`${styles.btn} ${styles.copyBtn}`}
          onClick={() => handleCopyLink()}
        >
          <FiCopy className={styles.btnIcon} />
          <span>{copied ? 'Copied' : 'Copy link'}</span>
        </button>
      </div>
    </div>
  )
}
