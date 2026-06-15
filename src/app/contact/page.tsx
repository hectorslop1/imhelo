import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactContent from './ContactContent'

export const metadata = {
  title: 'Contact — HELO',
  description: 'Start a project with Hector Lopez (HELO) — design, frontend, and brand work. hello@imhelo.com',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactContent />
      <Footer />
    </>
  )
}
