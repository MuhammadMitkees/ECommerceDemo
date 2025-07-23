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
                <Typography
                  variant="h3"
                  className={styles.title}
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "2.5rem",
                      lg: "3rem",
                    },
                    lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                  }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  variant="h6"
                  className={styles.subtitle}
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.1rem",
                      lg: "1.25rem",
                    },
                    lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 },
                  }}
                >
                  {banner.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={styles.ctaButton}
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                  }}
                >
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
