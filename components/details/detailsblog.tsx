"use client"
import React, { useState } from 'react'
import styles from './detailsblog.module.css'
import BlogNavbar from '../blog/blognavbar'
import BlogFooter from '../blog/blogfooter'

type Props = {
  title: string
  excerpt?: string
  author?: string
  date?: string
  readingTime?: string
  hero?: string
  children?: React.ReactNode
}

export default function DetailsBlog({
  title,
  excerpt,
  author = 'Author',
  date,
  readingTime,
  hero,
  children,
}: Props) {
  const [copied, setCopied] = useState(false)

  function handleShare(provider: 'linkedin' | 'facebook') {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const encoded = encodeURIComponent(url)
    const titleEnc = encodeURIComponent(title)

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
        if (ta.parentNode) {
          ta.parentNode.removeChild(ta)
        }
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      // ignore copy failure silently
    }
  }

  return (
    <>
      <BlogNavbar />

      <article className={styles.wrapper}>
        <div className={styles.inner}>
          <nav className={styles.breadcrumb}>Home / Blog / Webdesign</nav>

          <div className={styles.titleBlock}>
            <p className={styles.kicker}>Webdesign &nbsp; | &nbsp; UI/UX Design</p>
            <h1 className={styles.title}>{title}</h1>
            {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
            <div className={styles.meta}>
              <span>{author}</span>
              {date && <span>{date}</span>}
              {readingTime && <span>{readingTime}</span>}
            </div>
          </div>

          <section className={styles.content}>
            <div className={styles.heroWrap}>
              <img src={hero || '/images/product-bg.svg'} alt="Article visual" className={styles.hero} />
            </div>
            {children}
          </section>

          <div className={styles.shareBar}>
            <div className={styles.shareButtons}>
              <button
                type="button"
                aria-label="Share on LinkedIn"
                className={`${styles.btn} ${styles.social}`}
                onClick={() => handleShare('linkedin')}
              >
                LinkedIn
              </button>
              <button
                type="button"
                aria-label="Share on Facebook"
                className={`${styles.btn} ${styles.social}`}
                onClick={() => handleShare('facebook')}
              >
                Facebook
              </button>
              <button
                type="button"
                aria-label="Copy link"
                aria-pressed={copied}
                className={`${styles.btn} ${styles.copyBtn}`}
                onClick={() => handleCopyLink()}
              >
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>
        </div>
      </article>

      <BlogFooter />
    </>
  )
}
