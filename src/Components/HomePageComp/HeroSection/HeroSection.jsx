import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./HeroSection.module.css";
import banner1 from "../../../assets/images/banner1.png";
import banner2 from "../../../assets/images/banner2.png";
import banner3 from "../../../assets/images/banner3.png";

const banners = [
  {
    id: 1,
    image: banner1,
    title: "Up to 50% Off Electronics",
    subtitle: "Discover the latest deals on phones, laptops, and accessories.",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: banner2,
    title: "Fashion Deals for All Seasons",
    subtitle: "New styles, big discounts.",
    cta: "Explore Fashion",
  },
  {
    id: 3,
    image: banner3,
    title: "Your Home, Your Style",
    subtitle: "Save big on kitchen, furniture & more.",
    cta: "Furnish Now",
  },
];

const HeroSection = () => {
  return (
    <Box className={styles.heroContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 5000 }}
        // loop
        className={styles.swiper}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Box
              className={styles.slide}
              sx={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <Box className={styles.overlay}>
                <Typography variant="h3" className={styles.title}>
                  {banner.title}
                </Typography>
                <Typography variant="h6" className={styles.subtitle}>
                  {banner.subtitle}
                </Typography>
                <Button variant="contained" color="primary" size="large">
                  {banner.cta}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSection;
