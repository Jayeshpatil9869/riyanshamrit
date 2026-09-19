import React, { useState } from 'react';
import { Product } from '../types';
import { useCommerce } from '../context/CommerceContext';
import { useRouter } from '../context/RouterContext';
import { Heart, Eye, ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCommerce();
  const { navigate } = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const isWish = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleClick = (e: React.MouseEvent) => {
    // Avoid triggering card navigation if button clicked
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigate(`/products/${product.slug}`);
  };

  return (
    <div
      id={`product-card-${product.slug}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Image Container with Editorial Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#e8e8e1] border border-[rgba(26,28,24,0.06)]">
        {/* Main Product Image */}
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Tag Pill */}
        {product.tag && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-1 bg-[#1a1c18]/90 text-[#dac5a7] rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold backdrop-blur-xs">
              {product.tag}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && !product.tag && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-1 bg-[#757d5c] text-white rounded-full text-[11px] font-mono tracking-wider font-semibold">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWish
              ? 'bg-white text-red-600 shadow-sm'
              : 'bg-white/80 text-[#1a1c18]/70 hover:text-[#1a1c18] hover:bg-white'
          }`}
          title={isWish ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-red-600' : ''}`} />
        </button>

        {/* Quick View & Quick Add Action Bar (always visible on mobile touch, hover on desktop) */}
        <div className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 z-10 flex gap-1.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 sm:py-2.5 px-3 bg-white/95 hover:bg-white text-[#1a1c18] rounded-full text-xs font-semibold transition-colors backdrop-blur-md shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Quick View</span>
            <span className="xs:hidden">View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 py-2 sm:py-2.5 px-3 bg-[#1a1c18] hover:bg-[#3c4433] text-[#f2f2ef] rounded-full text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#dac5a7]" />
            <span className="hidden xs:inline">Add to Bag</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Metadata / Details */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1a1c18]/70 font-medium">
              {product.category.split('&')[0]}
            </span>
            <span className="text-xs font-mono text-[#5f664a] font-medium">
              {product.volume}
            </span>
          </div>

          <h3 className="font-sans text-[15.5px] sm:text-[16.5px] font-medium text-[#1a1c18] group-hover:text-[#3c4433] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          <p className="text-[13px] text-[#1a1c18]/70 line-clamp-1 mt-0.5 font-normal">
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[rgba(26,28,24,0.06)]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[16px] sm:text-[17px] font-semibold text-[#1a1c18]">
              {formatPrice(product.price)}
            </span>
            <span className="font-mono text-[13px] text-[#1a1c18]/50 line-through font-normal">
              {formatPrice(product.compareAtPrice)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-[#1a1c18]/80 group-hover:text-[#3c4433] transition-colors">
            <span className="hidden sm:inline">Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
