import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/cookies/CookieBanner";
import ScrollToTop from "@/components/layout/ScrollToTop";
import GlobalScrollHint from "@/components/layout/GlobalScrollHint";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import ShopCartPanel from "@/components/shop/ShopCartPanel";
import ShopToast from "@/components/shop/ShopToast";
import { ShopCartProvider } from "@/context/ShopCartContext";
import { CmsProvider } from "@/context/CmsContext";
import { AdminRoot, RequireAdmin } from "@/pages/admin/AdminApp";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminOverviewPage from "@/pages/admin/AdminOverviewPage";
import AdminBrandingPage from "@/pages/admin/AdminBrandingPage";
import AdminPageImagesPage from "@/pages/admin/AdminPageImagesPage";
import AdminShopPage from "@/pages/admin/AdminShopPage";
import AdminEventsPage from "@/pages/admin/AdminEventsPage";
import AdminFormationPage from "@/pages/admin/AdminFormationPage";
import AdminDonatePage from "@/pages/admin/AdminDonatePage";
import AdminInboxPage from "@/pages/admin/AdminInboxPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

const HomePage = lazy(() => import("@/pages/HomePage"));
const MotherPage = lazy(() => import("@/pages/MotherPage"));
const MotherSectionPage = lazy(() => import("@/pages/mother/MotherSectionPage"));
const MotherAvataarhoodPage = lazy(() => import("@/pages/mother/MotherAvataarhoodPage"));
const MotherDeclarationPage = lazy(() => import("@/pages/mother/MotherDeclarationPage"));
const MotherSwamiPage = lazy(() => import("@/pages/mother/MotherSwamiPage"));
const MotherRealizedPage = lazy(() => import("@/pages/mother/MotherRealizedPage"));
const MotherForNeedyHubPage = lazy(() => import("@/pages/MotherForNeedyHubPage"));
const RuralUpliftmentHubPage = lazy(() => import("@/pages/RuralUpliftmentHubPage"));
const GoshalaPage = lazy(() => import("@/pages/GoshalaPage"));
const GoshalaAdoptPage = lazy(() => import("@/pages/goshala/GoshalaAdoptPage"));
const GoshalaDayPage = lazy(() => import("@/pages/goshala/GoshalaDayPage"));
const AshramPage = lazy(() => import("@/pages/AshramPage"));
const TemplePage = lazy(() => import("@/pages/ashram/TemplePage"));
const AshramBhairavaPage = lazy(() => import("@/pages/ashram/AshramBhairavaPage"));
const AshramHarakeNandiPage = lazy(() => import("@/pages/ashram/AshramHarakeNandiPage"));
const SevaPage = lazy(() => import("@/pages/SevaPage"));
const SevaPillarPage = lazy(() => import("@/pages/seva/SevaPillarPage"));
const SevaMedicalVillagePage = lazy(() => import("@/pages/seva/SevaMedicalVillagePage"));
const SevasHubPage = lazy(() => import("@/pages/SevasHubPage"));
const AshramRitualPage = lazy(() => import("@/pages/sevas/AshramRitualPage"));
const SevaBookPage = lazy(() => import("@/pages/sevas/SevaBookPage"));
const VolunteerPage = lazy(() => import("@/pages/VolunteerPage"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage"));
const DonatePage = lazy(() => import("@/pages/DonatePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const CookiePolicyPage = lazy(() => import("@/pages/CookiePolicyPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function RouteFallback() {
  return <div className="route-loading" aria-hidden="true" />;
}

function PublicLayout() {
  return (
    <ShopCartProvider>
      <ScrollToTop/>
      <SeoHead/>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header/>
      <main id="main-content">
        <Suspense fallback={<RouteFallback />}>
          <Outlet/>
        </Suspense>
      </main>
      <Footer/>
      <GlobalScrollHint/>
      <CookieBanner/>
      <ShopCartPanel/>
      <ShopToast/>
    </ShopCartProvider>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <BrowserRouter>
        <CookieConsentProvider>
          <AnalyticsTracker />
          <Routes>
        <Route path="/admin" element={<AdminRoot />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<RequireAdmin />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="branding" element={<AdminBrandingPage />} />
            <Route path="images" element={<AdminPageImagesPage />} />
            <Route path="heroes" element={<AdminPageImagesPage />} />
            <Route path="shop" element={<AdminShopPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="formation" element={<AdminFormationPage />} />
            <Route path="donate" element={<AdminDonatePage />} />
            <Route path="inbox" element={<AdminInboxPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/mother-for-needy" element={<MotherForNeedyHubPage/>}/>
          <Route path="/rural-upliftment" element={<RuralUpliftmentHubPage/>}/>
          <Route path="/mother/story" element={<Navigate to="/mother/avatar" replace />}/>
          <Route path="/mother/avataarhood" element={<MotherAvataarhoodPage/>}/>
          <Route path="/mother/declaration" element={<MotherDeclarationPage/>}/>
          <Route path="/mother/swami" element={<MotherSwamiPage/>}/>
          <Route path="/mother/realized" element={<MotherRealizedPage/>}/>
          <Route path="/mother/:sectionId" element={<MotherSectionPage/>}/>
          <Route path="/mother" element={<MotherPage/>}/>
          <Route path="/goshala/history" element={<Navigate to="/goshala#history" replace />}/>
          <Route path="/goshala/adopt" element={<GoshalaAdoptPage/>}/>
          <Route path="/goshala/day" element={<GoshalaDayPage/>}/>
          <Route path="/goshala" element={<GoshalaPage/>}/>
          <Route path="/ashram/bhairava" element={<AshramBhairavaPage/>}/>
          <Route path="/ashram/harake-nandi" element={<AshramHarakeNandiPage/>}/>
          <Route path="/ashram/:templeId" element={<TemplePage/>}/>
          <Route path="/ashram" element={<AshramPage/>}/>
          <Route path="/seva/medical-village" element={<SevaMedicalVillagePage/>}/>
          <Route path="/seva/:pillarId" element={<SevaPillarPage/>}/>
          <Route path="/seva" element={<SevaPage/>}/>
          <Route path="/sevas/butter-ganesha" element={<Navigate to="/sevas/ganesh-abhisheka" replace />}/>
          <Route path="/sevas/butter-subramanya" element={<Navigate to="/sevas/subramanya-seva" replace />}/>
          <Route path="/sevas/:ritualId/book" element={<SevaBookPage/>}/>
          <Route path="/sevas/:ritualId" element={<AshramRitualPage/>}/>
          <Route path="/sevas" element={<SevasHubPage/>}/>
          <Route path="/volunteering" element={<VolunteerPage/>}/>
          <Route path="/shop/:category" element={<ShopPage/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/donate" element={<DonatePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/cookie-policy" element={<CookiePolicyPage/>}/>
          <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
        </CookieConsentProvider>
    </BrowserRouter>
    </CmsProvider>
  );
}
