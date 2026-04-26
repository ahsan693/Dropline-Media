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