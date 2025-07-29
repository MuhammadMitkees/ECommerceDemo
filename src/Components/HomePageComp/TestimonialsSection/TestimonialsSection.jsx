import React, { useState } from "react";
import { Box, Typography, Avatar, Rating, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ali",
    title: "Frequent Shopper",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
    feedback:
      "Amazing service and fast delivery! This is my go-to store for all electronics and home goods.",
  },
  {
    id: 2,
    name: "Mohamed H.",
    title: "Verified Buyer",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=2",
    feedback:
      "Great selection, competitive prices. Customer support was super helpful too!",
  },
  {
    id: 3,
    name: "Layla M.",
    title: "Fashion Enthusiast",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=3",
    feedback:
      "I love the fashion section! Always new arrivals and awesome discounts.",
  },
];

const TestimonialsSection = () => {
  const theme = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);

    // Calculate scroll progress
    const progress = swiper.progress;
    setScrollProgress(progress * 100);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        What Our Customers Say
      </Typography>

      <div className={styles.swiperContainer}>
        {/* Edge Pulse Indicators */}
        <div
          className={`${styles.edgeIndicator} ${styles.leftEdge} ${
            !isAtStart ? styles.hidden : ""
          }`}
        >
          <span className={styles.chevron}>‹</span>
        </div>
        <div
          className={`${styles.edgeIndicator} ${styles.rightEdge} ${
            !isAtEnd ? styles.hidden : ""
          }`}
        >
          <span className={styles.chevron}>›</span>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          pagination={{
            el: `.${styles.swiperPagination}`,
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{ delay: 6000 }}
          loop
          className={styles.swiper}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            setIsAtStart(swiper.isBeginning);
            setIsAtEnd(swiper.isEnd);
          }}
          breakpoints={{
            // Mobile (320px and up)
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            // Small tablets (640px and up)
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // Medium tablets (768px and up)
            768: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            // Large screens (1024px and up)
            1024: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            // Extra large screens (1280px and up)
            1280: {
              slidesPerView: 1,
              spaceBetween: 32,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <Box className={styles.card}>
                <Avatar
                  src={item.avatar}
                  alt={item.name}
                  className={styles.avatar}
                />
                <Typography variant="h6" className={styles.name}>
                  {item.name}
                </Typography>
                <Typography variant="body2" className={styles.title}>
                  {item.title}
                </Typography>
                <Rating value={item.rating} readOnly />
                <Typography variant="body1" className={styles.feedback}>
                  "{item.feedback}"
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons for Desktop */}
        <div className={styles.swiperButtonPrev}></div>
        <div className={styles.swiperButtonNext}></div>

        {/* Pagination Dots for Mobile/Tablet */}
        <div className={styles.swiperPagination}></div>

        {/* Side Gradients for Mobile/Tablet Hint */}
        <div className={styles.sideGradientLeft}></div>
        <div className={styles.sideGradientRight}></div>
      </div>
    </Box>
  );
};

export default TestimonialsSection;
