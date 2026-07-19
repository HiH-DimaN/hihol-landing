import Nav from './compliance/Nav'
import ComplianceHero from './compliance/ComplianceHero'
import BusinessProof from './compliance/BusinessProof'
import SelfCheck from './compliance/SelfCheck'
import FinesTable from './compliance/FinesTable'
import ReportPreview from './compliance/ReportPreview'
import AuditScope from './compliance/AuditScope'
import PricingTiers from './compliance/PricingTiers'
import ExpertBlock from './compliance/ExpertBlock'
import ComplianceFaq from './compliance/ComplianceFaq'
import FinalCta from './compliance/FinalCta'
import StickyCta from './compliance/StickyCta'
import SiteFooter from './SiteFooter'

export default function Compliance152Landing() {
  return (
    <div className="compliance-theme compliance-home min-h-screen">
      <Nav />
      <main>
        <ComplianceHero />
        <BusinessProof />
        <SelfCheck />
        <FinesTable />
        <ReportPreview />
        <AuditScope />
        <PricingTiers />
        <ExpertBlock />
        <ComplianceFaq />
        <FinalCta />
      </main>
      <SiteFooter variant="dark" direction="compliance" />
      <StickyCta />
    </div>
  )
}
