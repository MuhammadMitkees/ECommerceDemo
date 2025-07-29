import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./ProductSection.module.css";
import { convertUSDToOMR } from "../../../utils/currency";

const MAX_ITEMS = 25;

const ProductSection = ({ title, products }) => {
  const visibleProducts = products.slice(0, MAX_ITEMS);
  const swiperRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-demo effect on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && showDemo) {
        // Subtle auto-scroll to demonstrate swipeability
        swiperRef.current.swiper.slideNext();
        setTimeout(() => {
          swiperRef.current.swiper.slidePrev();
          setShowDemo(false);
        }, 1500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showDemo]);

  const handleSlideChange = (swiper) => {
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);

    // Calculate scroll progress
    const progress = swiper.progress;
    setScrollProgress(progress * 100);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Progress Bar for Mobile/Tablet */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={
            showDemo
              ? {
                  delay: 3000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          pagination={{
            el: `.${styles.swiperPagination}`,
            clickable: true,
            dynamicBullets: true,
          }}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            setIsAtStart(swiper.isBeginning);
            setIsAtEnd(swiper.isEnd);
          }}
          breakpoints={{
            // Mobile small
            320: {
              slidesPerView: 1.2,
              spaceBetween: 12,
              centeredSlides: false,
            },
            // Mobile large
            480: {
              slidesPerView: 1.8,
              spaceBetween: 16,
              centeredSlides: false,
            },
            // Tablet small
            576: {
              slidesPerView: 2.3,
              spaceBetween: 16,
              centeredSlides: false,
            },
            // Tablet
            768: {
              slidesPerView: 2.8,
              spaceBetween: 20,
              centeredSlides: false,
            },
            // Tablet large
            992: {
              slidesPerView: 3.2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            // Desktop
            1200: {
              slidesPerView: 4,
              spaceBetween: 24,
              centeredSlides: false,
            },
            // Large desktop
            1400: {
              slidesPerView: 4.5,
              spaceBetween: 24,
              centeredSlides: false,
            },
          }}
          className={styles.swiperWrapper}
        >
          {visibleProducts.map((product, index) => {
            const discountedUSD =
              product.price * (1 - product.discountPercentage / 100);
            const discountedOMR = convertUSDToOMR(discountedUSD);
            const originalOMR = convertUSDToOMR(product.price);

            return (
              <SwiperSlide key={product.id}>
                <div
                  className={`${styles.productCard} ${
                    showDemo && index === 1 ? styles.demoHighlight : ""
                  }`}
                >
                  <div className={styles.imageWrapper}>
                    {product.discountPercentage > 0 && (
                      <span className={styles.discountTag}>
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className={styles.productImage}
                    />
                  </div>
                  <h3 className={styles.productName}>{product.title}</h3>
                  <p className={styles.productPrice}>
                    {product.discountPercentage ? (
                      <>
                        <span className={styles.discountedPrice}>
                          OMR {discountedOMR}
                        </span>
                        <span className={styles.originalPrice}>
                          OMR {originalOMR}
                        </span>
                      </>
                    ) : (
                      <>OMR {originalOMR}</>
                    )}
                  </p>
                  <p className={styles.category}>{product.category}</p>
                </div>
              </SwiperSlide>
            );
          })}
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

      {/* Card Counter for Mobile/Tablet */}
      <div className={styles.cardCounter}>
        <span className={styles.counterText}>
          {Math.floor(scrollProgress / (100 / visibleProducts.length)) + 1} of{" "}
          {visibleProducts.length} products
        </span>
      </div>
    </section>
  );
};

export default ProductSection;
