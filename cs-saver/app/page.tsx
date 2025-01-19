import Header from '../components/Header'
import AnalysisSection from '../components/AnalysisSection'
import GetAnalysisSection from '../components/GetAnalysisSection'

export default function Home() {

  //make fetch request to startSession

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-400 to-pink-400">
        <AnalysisSection />
        <GetAnalysisSection />
      </div>
    </main>
  )
}

