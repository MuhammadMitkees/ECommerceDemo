import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById, fetchRelatedProducts } from "../../api/products";
import RelatedProducts from "../../Components/ProductPageComponents/RelatedProducts/RelatedProducts";
import ReviewsSection from "../../Components/ProductPageComponents/ReviewsSection/ReviewsSection";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const imageRef = useRef(null);
  const zoomTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      if (data?.thumbnail) setMainImage(data.thumbnail);

      // Fetch related products based on tags
      if (data?.tags && data.tags.length > 0) {
        // This is a placeholder - you need to implement this API endpoint
        const related = await fetchRelatedProducts(data.tags);
        setRelatedProducts(related.filter((p) => p.id !== data.id).slice(0, 6));
      }
    };
    fetchData();
  }, [id]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }
    };
  }, []);
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, {
      items: arrayUnion({ ...product, quantity: 1 }),
    });
    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please log in to buy items.");
      return;
    }
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, {
      items: arrayUnion({ ...product, quantity: 1 }),
    });
    // Wait a short moment to ensure Firestore updates before navigating
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 300);
  };

  const handleShare = async () => {
    const shareData = {
      title: product?.title,
      text: `Check out ${product?.title} - ${product?.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || isTransitioning) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Ensure the zoom stays within bounds
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setZoomPosition({ x: boundedX, y: boundedY });

    // Calculate modal position with boundaries
    const modalWidth = 400; // Match the CSS width
    const modalHeight = 400; // Match the CSS height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = e.clientX;
    let top = e.clientY - modalHeight / 2;

    // Prevent modal from going off-screen
    if (left + modalWidth > viewportWidth) {
      left = e.clientX - modalWidth - 20; // 20px offset from cursor
    }
    if (top < 0) {
      top = 0;
    } else if (top + modalHeight > viewportHeight) {
      top = viewportHeight - modalHeight;
    }

    setModalPosition({ top, left });
  };

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before hiding the zoom to prevent flickering
    zoomTimeoutRef.current = setTimeout(() => {
      setShowZoom(false);
    }, 100);
  };

  const handleThumbnailClick = (img, idx) => {
    setIsTransitioning(true);
    setMainImage(img);
    setSelectedThumbnail(idx);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with CSS transition duration
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className={styles.star}>
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className={styles.starHalf}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={styles.starEmpty}>
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  const renderRatingBar = (percentage, count, total) => (
    <div className={styles.ratingBar}>
      <div className={styles.ratingBarLabel}>{count} star</div>
      <div className={styles.ratingBarTrack}>
        <div
          className={styles.ratingBarFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={styles.ratingBarCount}>{total}</div>
    </div>
  );

  if (!product) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  // Calculate rating statistics
  const totalReviews = product.reviews?.length || 0;
  const averageRating = product.rating || 0;
  const ratingCounts = {
    5: Math.round(totalReviews * 0.37), // Example distribution
    4: Math.round(totalReviews * 0.28),
    3: Math.round(totalReviews * 0.2),
    2: Math.round(totalReviews * 0.1),
    1: Math.round(totalReviews * 0.05),
  };

  return (
    <>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.imagesColumn}>
          {[product.thumbnail, ...product.images].map((img, idx) => (
            <div
              key={idx}
              className={`${styles.thumbnailWrapper} ${
                selectedThumbnail === idx ? styles.selectedThumbnail : ""
              }`}
            >
              <img
                src={img}
                alt={`${product.title} - view ${idx + 1}`}
                onClick={() => handleThumbnailClick(img, idx)}
                className={styles.thumbnail}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Center Column */}
        <div className={styles.mainImageColumn}>
          <button
            className={styles.shareBtn}
            onClick={handleShare}
            aria-label="Share product"
          >
            <span role="img" aria-label="share icon">
              🔗
            </span>
          </button>

          <div
            className={styles.imageWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              onMouseMove={handleMouseMove}
              ref={imageRef}
              src={mainImage}
              alt={product.title}
              className={`${styles.mainImage} ${
                isTransitioning ? styles.transitioning : ""
              }`}
              loading="eager"
            />
            {showZoom && (
              <div
                className={styles.zoomModal}
                style={{
                  backgroundImage: `url(${mainImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  top: `${modalPosition.top}px`,
                  left: `${modalPosition.left}px`,
                }}
              />
            )}
            <div className={styles.zoomInstruction}>Hover to zoom</div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.detailsColumn}>
          <div className={styles.header}>
            <h1>{product.title}</h1>
            <div className={styles.brand}>{product.brand}</div>
            <div className={styles.rating}>
              <span className={styles.stars}>
                {"⭐".repeat(Math.round(product.rating))}
              </span>
              <span className={styles.ratingCount}>
                {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.price}>
              <span className={styles.currency}>SAR</span>
              <span className={styles.amount}>{discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <div className={styles.priceDetails}>
                  <span className={styles.originalPrice}>
                    SAR {product.price.toFixed(2)}
                  </span>
                  <span className={styles.discount}>
                    Save {product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.stockStatus}>
            {product.stock > 0 ? (
              <span className={styles.inStock}>
                <span className={styles.dot}></span>
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className={styles.outOfStock}>
                <span className={styles.dot}></span>
                Out of Stock
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleAddToCart}
              className={styles.addToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className={styles.buyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          <div className={styles.descriptionSection}>
            <h2>About this item</h2>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products Section - Moved before reviews */}
      <RelatedProducts
        relatedProducts={relatedProducts}
        renderRatingStars={renderRatingStars}
      />

      <ReviewsSection product={product} renderRatingStars={renderRatingStars} />
    </>
  );
};

export default ProductPage;
