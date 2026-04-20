import DetailsBlog from '@/components/details/detailsblog'

export const metadata = {
  title: 'Details sample',
}

export default function DetailsPage() {
  return (
    <main>
      <DetailsBlog
        title="Sample Details Page"
        excerpt="This is a sample details page demonstrating the DetailsBlog layout."
        author="Kerim Bilin"
        date="April 20, 2026"
        readingTime="3 min reading time"
        hero="/images/product-bg.svg"
      >
        <p>
          This is a demo article body. Use this page to validate the details
          layout and styles.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
      </DetailsBlog>
    </main>
  )
}
