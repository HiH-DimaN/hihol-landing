import Nav from './compliance/Nav'
import ComplianceHero from './compliance/ComplianceHero'
import SelfCheck from './compliance/SelfCheck'
import FinesTable from './compliance/FinesTable'
import AuditScope from './compliance/AuditScope'
import PricingTiers from './compliance/PricingTiers'
import ExpertBlock from './compliance/ExpertBlock'
import ComplianceFaq from './compliance/ComplianceFaq'
import FinalCta from './compliance/FinalCta'
import StickyCta from './compliance/StickyCta'
import SiteFooter from './SiteFooter'

export default function Compliance152Landing() {
  return (
    <div className="compliance-theme min-h-screen">
      <Nav />
      <main>
        <ComplianceHero />
        <SelfCheck />
        <FinesTable />
        <AuditScope />
        <PricingTiers />
        <ExpertBlock />
        <ComplianceFaq />
        <FinalCta />
      </main>
      <SiteFooter variant="dark" />
      <StickyCta />
    </div>
  )
}
