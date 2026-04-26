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
        gridImages={[
          '/images/product-bg.svg',
          '/images/product-bg.svg',
          '/images/product-bg.svg',
        ]}
        soloImage="/images/product-bg.svg"
        body="This is a demo article body. Use this page to validate the details layout and styles. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc."
      />
    </main>
  )
}