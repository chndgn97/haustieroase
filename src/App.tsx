import { Routes, Route } from "react-router-dom"

import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import CookieBanner from "./components/CookieBanner" // ✅ NEU

import Home from "./pages/Home"
import ProductsPage from "./pages/ProductsPage"
import BlogIndex from "./pages/BlogIndex"
import BlogPost from "./pages/BlogPost"
import ProductDetail from "./pages/ProductDetail"
import CategoryProducts from "./pages/CategoryProducts"
import About from "./pages/About"
import Impressum from "./pages/Impressum"
import Datenschutz from "./pages/Datenschutz"

export default function App() {
  return (
    <>
      <Navigation />
      <ScrollToTop />
      <CookieBanner /> {/* ✅ DSGVO Cookie Banner global */}

      <Routes>
        {/* Startseite */}
        <Route path="/" element={<Home />} />

        {/* Alle Produkte */}
        <Route path="/produkte" element={<ProductsPage />} />

        {/* Über uns */}
        <Route path="/ueber-uns" element={<About />} />

        {/* Impressum */}
        <Route path="/impressum" element={<Impressum />} />

        {/* Datenschutz */}
        <Route path="/datenschutz" element={<Datenschutz />} />

        {/* Blog Übersicht */}
        <Route path="/blog" element={<BlogIndex />} />

        {/* Einzelner Blogartikel */}
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Produkt Detail */}
        <Route path="/produkt/:id" element={<ProductDetail />} />

        {/* Kategorie */}
        <Route path="/kategorie/:slug" element={<CategoryProducts />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}