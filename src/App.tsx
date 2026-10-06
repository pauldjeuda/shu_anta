import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart/CartContext";
import { ToastProvider, ToastStyles } from "./components/CartToast";
import { LocaleProvider } from "./i18n/LocaleContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import BoutiquesPage from "./pages/BoutiquesPage";
import SpaPage from "./pages/SpaPage";
import BlogPage, { BlogArticlePage } from "./pages/BlogPage";
import MentionsPage from "./pages/MentionsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CartPage from "./pages/CartPage";

function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="relative min-h-[50vh] bg-page">
      {children}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <LocaleProvider>
        <ToastProvider>
          <ToastStyles />
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/catalogue"
              element={
                <PageMain>
                  <CataloguePage />
                </PageMain>
              }
            />
            <Route
              path="/produit/:id"
              element={
                <PageMain>
                  <ProductDetailPage />
                </PageMain>
              }
            />
            <Route
              path="/savons"
              element={
                <PageMain>
                  <CategoryPage id="savons" />
                </PageMain>
              }
            />
            <Route
              path="/soins-corps"
              element={
                <PageMain>
                  <CategoryPage id="soins-corps" />
                </PageMain>
              }
            />
            <Route
              path="/soins-visage"
              element={
                <PageMain>
                  <CategoryPage id="soins-visage" />
                </PageMain>
              }
            />
            <Route
              path="/huiles-beurres"
              element={
                <PageMain>
                  <CategoryPage id="huiles-beurres" />
                </PageMain>
              }
            />
            <Route
              path="/routine-visage"
              element={
                <PageMain>
                  <CategoryPage id="routine-visage" />
                </PageMain>
              }
            />
            <Route
              path="/a-propos"
              element={
                <PageMain>
                  <AboutPage />
                </PageMain>
              }
            />
            <Route
              path="/boutiques"
              element={
                <PageMain>
                  <BoutiquesPage />
                </PageMain>
              }
            />
            <Route
              path="/conseils-spa"
              element={
                <PageMain>
                  <SpaPage />
                </PageMain>
              }
            />
            <Route
              path="/blog"
              element={
                <PageMain>
                  <BlogPage />
                </PageMain>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <PageMain>
                  <BlogArticlePage />
                </PageMain>
              }
            />
            <Route
              path="/mentions-legales"
              element={
                <PageMain>
                  <MentionsPage />
                </PageMain>
              }
            />
            <Route
              path="/confidentialite"
              element={
                <PageMain>
                  <PrivacyPage />
                </PageMain>
              }
            />
            <Route
              path="/panier"
              element={
                <PageMain>
                  <CartPage />
                </PageMain>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </ToastProvider>
        </LocaleProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
