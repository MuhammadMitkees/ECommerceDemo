import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import BlogPost from "./Pages/Blog/BlogPost";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Account from "./Pages/Account/Account";
import About from "./Pages/About/About";
import OurStory from "./Pages/About/OurStory";
import OurTeam from "./Pages/About/OurTeam";
import WhatWeDo from "./Pages/About/WhatWeDo";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/story" element={<OurStory />} />
          <Route path="/about/team" element={<OurTeam />} />
          <Route path="/about/what-we-do" element={<WhatWeDo />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
