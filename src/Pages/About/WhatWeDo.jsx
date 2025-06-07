import React from "react";
import styles from "./WhatWeDo.module.css";

const WhatWeDo = () => {
  const services = [
    {
      title: "E-commerce Platform",
      description:
        "A cutting-edge marketplace connecting millions of customers with trusted sellers worldwide.",
      features: [
        "Advanced search and filtering",
        "Secure payment processing",
        "Real-time inventory management",
        "Personalized recommendations",
      ],
    },
    {
      title: "Logistics Network",
      description:
        "State-of-the-art fulfillment centers and delivery network ensuring fast and reliable shipping.",
      features: [
        "Same-day delivery options",
        "International shipping",
        "Real-time tracking",
        "Eco-friendly packaging",
      ],
    },
    {
      title: "Seller Support",
      description:
        "Comprehensive tools and support helping businesses thrive in the digital marketplace.",
      features: [
        "Analytics dashboard",
        "Marketing tools",
        "Inventory management",
        "Business insights",
      ],
    },
  ];

  const innovations = [
    {
      title: "AI-Powered Shopping",
      description:
        "Using artificial intelligence to create personalized shopping experiences.",
      icon: "🤖",
    },
    {
      title: "Sustainable Commerce",
      description: "Implementing eco-friendly practices across our operations.",
      icon: "🌱",
    },
    {
      title: "Mobile First",
      description: "Optimized shopping experience for mobile devices.",
      icon: "📱",
    },
    {
      title: "Smart Logistics",
      description:
        "Using data analytics to optimize delivery routes and timing.",
      icon: "📦",
    },
  ];

  return (
    <div className={styles.whatWeDoContainer}>
      <div className={styles.hero}>
        <h1>What We Do</h1>
        <p>Revolutionizing E-commerce Through Innovation</p>
      </div>

      <div className={styles.content}>
        <section className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            To create the world's most customer-centric shopping experience by
            leveraging technology and innovation to connect people with products
            they love.
          </p>
        </section>

        <section className={styles.services}>
          <h2>Our Services</h2>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.title} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.innovations}>
          <h2>Innovation at Core</h2>
          <div className={styles.innovationsGrid}>
            {innovations.map((innovation) => (
              <div key={innovation.title} className={styles.innovationCard}>
                <span className={styles.icon}>{innovation.icon}</span>
                <h3>{innovation.title}</h3>
                <p>{innovation.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.commitment}>
          <h2>Our Commitment</h2>
          <div className={styles.commitmentContent}>
            <div className={styles.commitmentItem}>
              <h3>Customer Satisfaction</h3>
              <p>
                We're dedicated to providing the best shopping experience with
                24/7 customer support and hassle-free returns.
              </p>
            </div>
            <div className={styles.commitmentItem}>
              <h3>Quality Assurance</h3>
              <p>
                Every product on our platform goes through rigorous quality
                checks to ensure customer satisfaction.
              </p>
            </div>
            <div className={styles.commitmentItem}>
              <h3>Sustainable Practices</h3>
              <p>
                We're committed to reducing our environmental impact through
                eco-friendly packaging and sustainable operations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhatWeDo;
