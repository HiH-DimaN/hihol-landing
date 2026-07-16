import SiteFooter from './SiteFooter'
import AiHeader from './ai/AiHeader'
import AiHero, { AiCapabilityStrip } from './ai/AiHero'
import AiPricing from './ai/AiPricing'
import AiProblems from './ai/AiProblems'
import AiProcess from './ai/AiProcess'
import AiProof from './ai/AiProof'
import { AiFaq, AiFinalCta, AiPrivacyBridge } from './ai/AiPrivacyFaq'
import AiSolutions from './ai/AiSolutions'

export default function AiSolutionsPage() {
  return (
    <div className="compliance-theme compliance-home ai-home min-h-screen">
      <AiHeader />
      <main>
        <AiHero />
        <AiCapabilityStrip />
        <AiProblems />
        <AiSolutions />
        <AiProcess />
        <AiProof />
        <AiPricing />
        <AiPrivacyBridge />
        <AiFaq />
        <AiFinalCta />
      </main>
      <SiteFooter direction="ai" />
    </div>
  )
}
