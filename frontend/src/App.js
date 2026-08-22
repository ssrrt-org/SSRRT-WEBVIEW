import "@/App.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ShopCartPanel from "@/components/shop/ShopCartPanel";
import ShopToast from "@/components/shop/ShopToast";
import { ShopCartProvider } from "@/context/ShopCartContext";
import {
  HomePage,
  MotherPage,
  MotherSectionPage,
  MotherAvataarhoodPage,
  MotherSwamiPage,
  MotherRealizedPage,
  MotherForNeedyHubPage,
  RuralUpliftmentHubPage,
  GoshalaPage,
  GoshalaAdoptPage,
  GoshalaDayPage,
  AshramPage,
  TemplePage,
  AshramBhairavaPage,
  AshramHarakeNandiPage,
  SevaPage,
  SevaPillarPage,
  SevaMedicalVillagePage,
  SevasHubPage,
  AshramRitualPage,
  VolunteerPage,
  ShopPage,
  EventsPage,
  DonatePage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from "@/pages";
import { AdminRoot, RequireAdmin } from "@/pages/admin/AdminApp";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminOverviewPage from "@/pages/admin/AdminOverviewPage";
import AdminBrandingPage from "@/pages/admin/AdminBrandingPage";
import AdminHeroesPage from "@/pages/admin/AdminHeroesPage";
import AdminShopPage from "@/pages/admin/AdminShopPage";
import AdminEventsPage from "@/pages/admin/AdminEventsPage";
import AdminFormationPage from "@/pages/admin/AdminFormationPage";
import AdminDonatePage from "@/pages/admin/AdminDonatePage";
import AdminInboxPage from "@/pages/admin/AdminInboxPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

function PublicLayout() {
  return (
    <ShopCartProvider>
      <ScrollToTop/>
      <SeoHead/>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header/>
      <main id="main-content">
        <Outlet/>
      </main>
      <Footer/>
      <ShopCartPanel/>
      <ShopToast/>
    </ShopCartProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminRoot />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<RequireAdmin />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="branding" element={<AdminBrandingPage />} />
            <Route path="heroes" element={<AdminHeroesPage />} />
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
          <Route path="/mother/avataarhood" element={<MotherAvataarhoodPage/>}/>
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
          <Route path="/sevas/:ritualId" element={<AshramRitualPage/>}/>
          <Route path="/sevas" element={<SevasHubPage/>}/>
          <Route path="/volunteering" element={<VolunteerPage/>}/>
          <Route path="/shop/:category" element={<ShopPage/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/donate" element={<DonatePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
