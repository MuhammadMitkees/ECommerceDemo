import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./ProductSection.module.css";
import { convertUSDToOMR } from "../../../utils/currency";

const MAX_ITEMS = 25;

const ProductSection = ({ title, products }) => {
  const visibleProducts = products.slice(0, MAX_ITEMS);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={4}
        navigation
        className={styles.swiperWrapper}
      >
        {visibleProducts.map((product) => {
          const discountedUSD =
            product.price * (1 - product.discountPercentage / 100);
          const discountedOMR = convertUSDToOMR(discountedUSD);
          const originalOMR = convertUSDToOMR(product.price);

          return (
            <SwiperSlide key={product.id}>
              <div className={styles.productCard}>
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
    </section>
  );
};

export default ProductSection;
