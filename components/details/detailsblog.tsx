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
  /** image[0] — existing hero */
  hero?: string
  /** image[1], image[2], image[3] — 3-col grid (new) */
  gridImages?: (string | null | undefined)[]
  /** image[4] — wide full-width (new) */
  wideImage?: string | null
  /** image[5] — solo closing image (new) */
  soloImage?: string | null
  /** Plain text body for interleaving (new) */
  body?: string
  children?: React.ReactNode
}

export default function DetailsBlog({
  title,
  excerpt,
  author = 'Author',
  date,
  readingTime,
  hero,
  gridImages = [],
  wideImage,
  soloImage,
  body,
  children,
}: Props) {
  const [copied, setCopied] = useState(false)

  function handleShare(provider: 'linkedin' | 'facebook' | 'twitter') {
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

    if (provider === 'twitter') {
      const link = `https://twitter.com/intent/tweet?url=${encoded}&text=${titleEnc}`
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
      // ignore copy failure silently
    }
  }

  // Split body into 4 prose chunks for interleaving with images
  const bodyText = body ?? ''
  const sentences = bodyText.split(/(?<=[.!?])\s+/).filter(Boolean)
  const chunkSize = Math.max(1, Math.ceil(sentences.length / 4))
  const prose = Array.from({ length: 4 }, (_, i) =>
    sentences.slice(i * chunkSize, (i + 1) * chunkSize).join(' ')
  )

  const hasBody = bodyText.trim().length > 0
  const grid = gridImages.filter(Boolean) as string[]
  const hasGrid = grid.length > 0
  const hasWide = !!wideImage
  const hasSolo = !!soloImage
  const hasExtras = hasGrid || hasWide || hasSolo

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
            {/* ── Hero image — unchanged ── */}
            <div className={styles.heroWrap}>
              <img src={hero || '/images/product-bg.svg'} alt="Article visual" className={styles.hero} />
            </div>

            {/* ── Short blog: no extras, render children as before ── */}
            {!hasExtras && !hasBody && children}

            {/* ── Long blog: interleave text + images ── */}
            {(hasExtras || hasBody) && (
              <>
                {/* Prose chunk 1 */}
                {prose[0] && (
                  <p className={styles.contentText}>{prose[0]}</p>
                )}

                {/* 3-col image grid (images 2, 3, 4) */}
                {hasGrid && (
                  <div
                    className={styles.triGrid}
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(grid.length, 3)}, 1fr)`,
                    }}
                  >
                    {grid.slice(0, 3).map((src, i) => (
                      <div key={i} className={styles.triCell}>
                        <img
                          src={src}
                          alt={`${title} image ${i + 2}`}
                          className={styles.triImg}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Prose chunk 2 */}
                {prose[1] && (
                  <p className={styles.contentText}>{prose[1]}</p>
                )}

                {/* Prose chunk 3 */}
                {prose[2] && (
                  <p className={styles.contentText}>{prose[2]}</p>
                )}

                {/* Wide full-width image (image 5) */}
                {hasWide && (
                  <div className={styles.wideImgWrap}>
                    <img
                      src={wideImage as string}
                      alt={`${title} wide`}
                      className={styles.wideImg}
                    />
                  </div>
                )}

                {/* Prose chunk 4 — conclusion */}
                {prose[3] && (
                  <p className={styles.contentText}>{prose[3]}</p>
                )}

                {/* Solo closing image (image 6) */}
                {hasSolo && (
                  <div className={styles.soloImgWrap}>
                    <img
                      src={soloImage as string}
                      alt={`${title} closing`}
                      className={styles.soloImg}
                    />
                  </div>
                )}

                {/* children still rendered at end */}
                {children}
              </>
            )}
          </section>

          {/* ==================== SHARE BAR ==================== */}
          <div className={styles.shareBar}>
            {/* Left label */}
            <div className={styles.shareLabel}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share this article
            </div>

            {/* Right buttons */}
            <div className={styles.shareButtons}>
              {/* Split */}
              <button
                type="button"
                aria-label="Split view"
                className={`${styles.btn} ${styles.social}`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 3h5v5"/>
                  <path d="M8 3H3v5"/>
                  <path d="M21 16v5h-5"/>
                  <path d="M3 16v5h5"/>
                </svg>
                Split
              </button>

              {/* X (Twitter) */}
              <button
                type="button"
                aria-label="Share on X"
                className={`${styles.btn} ${styles.social}`}
                onClick={() => handleShare('twitter')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                aria-label="Share on LinkedIn"
                className={`${styles.btn} ${styles.social}`}
                onClick={() => handleShare('linkedin')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>

              {/* Facebook */}
              <button
                type="button"
                aria-label="Share on Facebook"
                className={`${styles.btn} ${styles.social}`}
                onClick={() => handleShare('facebook')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              {/* Copy link */}
              <button
                type="button"
                aria-label="Copy link"
                aria-pressed={copied}
                className={`${styles.btn} ${styles.copyBtn}`}
                onClick={handleCopyLink}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>

        </div>
      </article>

      <BlogFooter />
    </>
  )
}