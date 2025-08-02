import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./BlogPost.module.css";

const blogContent = {
  "sustainable-shopping": {
    title: "Sustainable Shopping: Making Eco-Friendly Choices",
    author: "Sarah Green",
    date: "March 15, 2024",
    readTime: "5 min read",
    image:
      "https://img.freepik.com/free-photo/eco-friendly-zero-waste-items-flat-lay_23-2149012496.jpg",
    content: `
      In today's rapidly evolving retail landscape, sustainable shopping has become more than just a trend – it's a necessity. As consumers become increasingly aware of their environmental impact, making eco-friendly choices while shopping has never been more important.

      ## Why Sustainable Shopping Matters

      The environmental impact of consumer behavior is significant. From packaging waste to carbon emissions from shipping, our shopping habits directly affect the planet. By making conscious choices, we can reduce our environmental footprint while still enjoying the convenience of online shopping.

      ### Key Areas for Sustainable Shopping

      1. **Packaging Choices**
         - Choose minimal packaging options
         - Opt for recyclable materials
         - Support retailers using eco-friendly packaging

      2. **Product Selection**
         - Look for items made from sustainable materials
         - Consider product longevity
         - Check for environmental certifications

      3. **Shipping Options**
         - Choose consolidated shipping
         - Opt for carbon-neutral delivery when available
         - Plan purchases to reduce multiple deliveries

      ## Making Better Choices

      ### Research Before Buying
      Take time to research products and companies. Look for:
      - Environmental commitments
      - Sustainable practices
      - Transparent supply chains

      ### Quality Over Quantity
      Invest in high-quality items that last longer. This approach:
      - Reduces waste
      - Saves money long-term
      - Minimizes environmental impact

      ## Our Commitment

      At our store, we're committed to sustainability through:
      - Eco-friendly packaging
      - Partnerships with sustainable brands
      - Carbon-neutral shipping options
      - Recycling programs

      ## Tips for Sustainable Shopping

      1. Create a shopping list to avoid impulse purchases
      2. Look for products with minimal packaging
      3. Choose local products when possible
      4. Support brands with strong environmental policies
      5. Consider second-hand options

      ## The Future of Sustainable Shopping

      The future of retail lies in sustainability. We're seeing:
      - Increased focus on circular economy
      - Innovation in sustainable materials
      - Better recycling solutions
      - More transparent supply chains

      ## Conclusion

      Sustainable shopping is a journey, not a destination. Every small choice matters, and together we can create a more sustainable future through mindful consumption.
    `,
  },
  "recycling-packaging": {
    title: "The Complete Guide to Recycling E-commerce Packaging",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    image:
      "https://media.istockphoto.com/id/1372577388/photo/old-electronic-devices-on-a-dark-background-the-concept-of-recycling-and-disposal-of.jpg?s=612x612&w=0&k=20&c=RGm3eCA76Y_IJJYGCLWS9acSR39Gb7iqsC_DIhJyG2g=",
    content: `
      As e-commerce continues to grow, so does the amount of packaging waste. Learning how to properly recycle packaging materials is crucial for environmental sustainability.

      ## Understanding Packaging Materials

      Different types of packaging require different recycling approaches:

      ### Cardboard Boxes
      - Break down boxes completely
      - Remove tape and labels
      - Keep dry and clean

      ### Plastic Materials
      - Check recycling numbers
      - Clean before recycling
      - Separate different types

      ## Best Practices for Recycling

      1. **Sort Properly**
         - Separate materials by type
         - Remove non-recyclable elements
         - Clean contaminated items

      2. **Reduce and Reuse**
         - Reuse boxes when possible
         - Minimize packaging waste
         - Choose eco-friendly alternatives

      ## Our Recycling Initiative

      We're committed to reducing waste through:
      - Recyclable packaging
      - Take-back programs
      - Waste reduction goals

      ## Tips for Better Recycling

      1. Create a recycling station at home
      2. Learn local recycling guidelines
      3. Educate family members
      4. Track your recycling impact

      ## The Impact of Proper Recycling

      When we recycle correctly:
      - Reduce landfill waste
      - Save energy
      - Protect resources
      - Support circular economy

      ## Future of Packaging Recycling

      Looking ahead, we see:
      - New recycling technologies
      - Better sorting systems
      - More sustainable materials
      - Improved recycling processes

      ## Conclusion

      Proper recycling of e-commerce packaging is essential for environmental sustainability. Every small action counts towards a better future.
    `,
  },
  "digital-minimalism": {
    title: "Digital Minimalism: Mindful Online Shopping",
    author: "Alex Rivera",
    date: "March 10, 2024",
    readTime: "4 min read",
    image:
      "https://img.freepik.com/free-photo/minimalist-desk-arrangement-with-copy-space_23-2149025926.jpg",
    content: `
      In today's digital age, the convenience of online shopping has transformed how we consume. However, this ease of access can often lead to mindless consumption and digital clutter.

      ## Understanding Digital Minimalism

      Digital minimalism in online shopping isn't just about buying less – it's about making intentional, thoughtful purchases that add value to your life.

      ### Key Principles

      1. **Intentional Browsing**
         - Set specific shopping goals
         - Avoid mindless scrolling
         - Use wish lists effectively

      2. **Digital Organization**
         - Keep organized shopping lists
         - Maintain a clean inbox
         - Unsubscribe from unnecessary promotional emails

      ## Practical Tips for Mindful Online Shopping

      ### Create Shopping Boundaries
      - Set specific shopping times
      - Use website blockers during work hours
      - Implement a waiting period for purchases

      ### Digital Declutter Strategies
      - Regular email cleanup
      - Organized bookmarks
      - Curated shopping apps

      ## Benefits of Digital Minimalism

      When we shop mindfully online:
      - Reduced impulse purchases
      - Better financial decisions
      - Less digital overwhelm
      - More intentional consumption

      ## Implementation Strategies

      1. Start with a digital detox
      2. Create shopping guidelines
      3. Use tools mindfully
      4. Track your habits
      5. Regular review and adjustment

      ## Conclusion

      Digital minimalism in online shopping is about finding balance in the digital age. By implementing these strategies, we can make more mindful and intentional purchasing decisions.
    `,
  },
  "ethical-fashion": {
    title: "The Rise of Ethical Fashion: Making Conscious Choices",
    author: "Emma Thompson",
    date: "February 28, 2024",
    readTime: "5 min read",
    image:
      "https://img.freepik.com/free-photo/sustainable-fashion-concept_23-2149133976.jpg",
    content: `
      The fashion industry is undergoing a significant transformation as consumers become more conscious of their environmental impact and ethical considerations.

      ## What is Ethical Fashion?

      Ethical fashion encompasses several key aspects:
      - Sustainable materials
      - Fair labor practices
      - Environmental consciousness
      - Animal welfare
      - Waste reduction

      ### Key Components

      1. **Sustainable Materials**
         - Organic cotton
         - Recycled fabrics
         - Innovative eco-materials

      2. **Fair Labor**
         - Living wages
         - Safe working conditions
         - Worker empowerment

      ## Making Ethical Fashion Choices

      ### Research Brands
      - Check certifications
      - Review company policies
      - Investigate supply chains

      ### Quality Over Quantity
      - Invest in durable pieces
      - Choose timeless styles
      - Consider cost per wear

      ## The Impact of Ethical Fashion

      Making conscious fashion choices leads to:
      - Reduced environmental impact
      - Better working conditions
      - Sustainable industry practices
      - Innovation in materials

      ## Future of Ethical Fashion

      The industry is evolving with:
      - New sustainable materials
      - Transparent supply chains
      - Circular fashion models
      - Consumer education

      ## Conclusion

      Ethical fashion is not just a trend but a necessary evolution in how we think about and consume clothing.
    `,
  },
  "mobile-shopping": {
    title: "Mobile Shopping: Tips for a Better Experience",
    author: "David Kim",
    date: "February 25, 2024",
    readTime: "4 min read",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: `
      Mobile shopping has become the preferred way to shop for many consumers. Here's how to make the most of your mobile shopping experience.

      ## Mobile Shopping Essentials

      ### Security First
      - Use secure networks
      - Enable two-factor authentication
      - Keep apps updated

      ### App Organization
      - Prioritize trusted retailers
      - Organize shopping apps
      - Enable relevant notifications

      ## Optimizing Your Experience

      1. **Smart App Usage**
         - Compare prices easily
         - Save favorites
         - Track orders

      2. **Payment Efficiency**
         - Save secure payment methods
         - Use digital wallets
         - Enable quick checkout

      ## Common Pitfalls to Avoid

      - Unsecured networks
      - Automatic purchases
      - Overlooking details
      - Ignoring reviews

      ## Making Better Mobile Purchases

      ### Research Thoroughly
      - Read product details
      - Check reviews
      - Compare prices
      - Verify sellers

      ## Future of Mobile Shopping

      Upcoming trends include:
      - AR try-ons
      - Voice shopping
      - Social commerce
      - Personalized recommendations

      ## Conclusion

      Mobile shopping can be both convenient and secure when approached thoughtfully.
    `,
  },
  "payment-security": {
    title: "Secure Online Payments: What You Need to Know",
    author: "Rachel Chen",
    date: "February 22, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    content: `
      Understanding and implementing secure payment practices is crucial for safe online shopping.

      ## Fundamentals of Payment Security

      ### Basic Security Measures
      - Strong passwords
      - Two-factor authentication
      - Secure networks
      - Updated software

      ### Payment Methods
      1. **Credit Cards**
         - Fraud protection
         - Purchase protection
         - Easy disputes

      2. **Digital Wallets**
         - Encrypted transactions
         - Biometric security
         - Tokenization

      ## Best Practices

      ### Before Payment
      - Verify website security
      - Check seller reputation
      - Review privacy policy
      - Understand terms

      ### During Payment
      - Use secure connections
      - Verify transaction details
      - Keep confirmation records
      - Monitor accounts

      ## Red Flags to Watch For

      Common security risks:
      - Unsecured websites
      - Suspicious requests
      - Unusual redirects
      - Pressure tactics

      ## Protecting Your Information

      Essential steps:
      1. Regular password updates
      2. Monitoring statements
      3. Using secure networks
      4. Keeping records

      ## Future of Payment Security

      Emerging technologies:
      - Blockchain payments
      - Biometric authentication
      - AI fraud detection
      - Quantum encryption

      ## Conclusion

      Staying informed and vigilant is key to secure online payments.
    `,
  },
};

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogContent[postId];

  if (!post) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1>Post not found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className={styles.errorButton}>
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content) => {
    return content
      .split("\n\n")
      .map((paragraph, index) => {
        const trimmed = paragraph.trim();

        if (!trimmed) return null;

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className={styles.heading2}>
              {trimmed.replace("## ", "")}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className={styles.heading3}>
              {trimmed.replace("### ", "")}
            </h3>
          );
        }

        if (trimmed.includes("- ") && trimmed.split("\n").length > 1) {
          const items = trimmed
            .split("\n")
            .filter((item) => item.trim().startsWith("- "));
          return (
            <ul key={index} className={styles.list}>
              {items.map((item, i) => (
                <li key={i}>{item.replace("- ", "").trim()}</li>
              ))}
            </ul>
          );
        }

        if (trimmed.match(/^\d+\./)) {
          const items = trimmed
            .split("\n")
            .filter((item) => item.trim().match(/^\d+\./));
          return (
            <ol key={index} className={styles.orderedList}>
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s*/, "").trim()}</li>
              ))}
            </ol>
          );
        }

        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          return (
            <div key={index} className={styles.highlight}>
              {trimmed.replace(/\*\*/g, "")}
            </div>
          );
        }

        return (
          <p key={index} className={styles.paragraph}>
            {trimmed}
          </p>
        );
      })
      .filter(Boolean);
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.metadata}>
            <span className={styles.author}>{post.author}</span>
            <time className={styles.date}>{post.date}</time>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
        </header>

        <div className={styles.imageContainer}>
          <img
            src={post.image}
            alt={post.title}
            className={styles.featuredImage}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>{renderContent(post.content)}</div>

        <footer className={styles.footer}>
          <Link to="/blog" className={styles.backButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Blog
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
