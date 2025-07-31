import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

const blogPosts = [
  {
    id: "sustainable-shopping",
    title: "Sustainable Shopping: Making Eco-Friendly Choices",
    excerpt:
      "Learn how your shopping choices can contribute to a healthier planet and sustainable future.",
    image:
      "https://img.freepik.com/free-photo/eco-friendly-zero-waste-items-flat-lay_23-2149012496.jpg",
    category: "Environment",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    id: "recycling-packaging",
    title: "The Complete Guide to Recycling E-commerce Packaging",
    excerpt:
      "Discover innovative ways to recycle and reuse packaging materials from your online purchases.",
    image:
      "https://media.istockphoto.com/id/1372577388/photo/old-electronic-devices-on-a-dark-background-the-concept-of-recycling-and-disposal-of.jpg?s=612x612&w=0&k=20&c=RGm3eCA76Y_IJJYGCLWS9acSR39Gb7iqsC_DIhJyG2g=",
    category: "Recycling",
    date: "March 12, 2024",
    readTime: "6 min read",
  },
  {
    id: "digital-minimalism",
    title: "Digital Minimalism: Mindful Online Shopping",
    excerpt:
      "How to shop mindfully online and avoid the pitfalls of overconsumption in the digital age.",
    image:
      "https://img.freepik.com/free-photo/minimalist-desk-arrangement-with-copy-space_23-2149025926.jpg",
    category: "Lifestyle",
    date: "March 10, 2024",
    readTime: "4 min read",
  },

  {
    id: "ethical-fashion",
    title: "The Rise of Ethical Fashion: Making Conscious Choices",
    excerpt:
      "Understanding the importance of ethical fashion and how to make sustainable clothing choices.",
    image:
      "https://img.freepik.com/free-photo/sustainable-fashion-concept_23-2149133976.jpg",
    category: "Fashion",
    date: "February 28, 2024",
    readTime: "5 min read",
  },
  {
    id: "mobile-shopping",
    title: "Mobile Shopping: Tips for a Better Experience",
    excerpt:
      "Maximize your mobile shopping experience with these essential tips and best practices.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Technology",
    date: "February 25, 2024",
    readTime: "4 min read",
  },
  {
    id: "payment-security",
    title: "Secure Online Payments: What You Need to Know",
    excerpt:
      "Stay safe while shopping online with our comprehensive guide to payment security.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    category: "Security",
    date: "February 22, 2024",
    readTime: "6 min read",
  },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className={styles.blogContainer}>
      <div className={styles.hero}>
        <h1>Our Blog</h1>
        <p>
          Insights, guides, and stories about sustainable e-commerce and mindful
          shopping
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredPosts.map((post) => (
            <Link to={`/blog/${post.id}`} className={styles.card} key={post.id}>
              <div className={styles.imageContainer}>
                <img src={post.image} alt={post.title} />
                <span className={styles.category}>{post.category}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.metadata}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.newsletter}>
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest insights and stories</p>
          <div className={styles.subscribeForm}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
