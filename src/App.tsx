import ProductDetail from "./pages/ProductDetail"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Blog from "./pages/Blog"

export default function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/produkt/:id" element={<ProductDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <Footer />
    </>
  )
}
