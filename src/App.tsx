import { Routes, Route } from "react-router-dom"

import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

import Home from "./pages/Home"
import BlogIndex from "./pages/BlogIndex"
import BlogPost from "./pages/BlogPost"
import ProductDetail from "./pages/ProductDetail"
import CategoryProducts from "./pages/CategoryProducts"

export default function App() {
  return (
    <>
      <Navigation />
      <ScrollToTop />

      <Routes>
        {/* Startseite */}
        <Route path="/" element={<Home />} />

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