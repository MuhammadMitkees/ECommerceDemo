import React from "react";
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

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        What Our Customers Say
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className={styles.swiper}
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
                “{item.feedback}”
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialsSection;
