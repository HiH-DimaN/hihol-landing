import Nav from './compliance/Nav'
import ComplianceHero from './compliance/ComplianceHero'
import BusinessProof from './compliance/BusinessProof'
import SelfCheck from './compliance/SelfCheck'
import ScannerDiff from './compliance/ScannerDiff'
import FinesTable from './compliance/FinesTable'
import RknDemand from './compliance/RknDemand'
import BotsAi from './compliance/BotsAi'
import ReportPreview from './compliance/ReportPreview'
import AuditScope from './compliance/AuditScope'
import PricingTiers from './compliance/PricingTiers'
import AgencyPartner from './compliance/AgencyPartner'
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
        <ScannerDiff />
        <FinesTable />
        <RknDemand />
        <ReportPreview />
        <AuditScope />
        <BotsAi />
        <PricingTiers />
        <AgencyPartner />
        <ExpertBlock />
        <ComplianceFaq />
        <FinalCta />
      </main>
      <SiteFooter variant="dark" direction="compliance" />
      <StickyCta />
    </div>
  )
}
