import React, { useState, useMemo } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Product, Ingredient } from '../../types';
import { CATEGORIES } from '../../data/products';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
  AlertCircle,
  RefreshCw,
  X,
  Image as ImageIcon,
  Layers,
  Leaf
} from 'lucide-react';

const INITIAL_EMPTY_PRODUCT: Omit<Product, 'id'> = {
  slug: '',
  name: '',
  tagline: '',
  category: 'Cleansers',
  healthConcern: 'Daily Cleansing & Glow',
  price: 29,
  compareAtPrice: 39,
  rating: 4.9,
  reviewCount: 42,
  image: '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
  hoverImage: '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg',
  gallery: [
    '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
    '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg'
  ],
  tag: 'ORGANIC',
  volume: '100 ml',
  sku: 'RY-BOT-01',
  inStock: true,
  stockCount: 120,
  featured: false,
  bestseller: false,
  isNew: true,
  description: 'Pure cold-pressed Ayurvedic botanical formulation handcrafted with potent Himalayan herbs.',
  keyBenefits: [
    'Deeply purifies and replenishes essential moisture',
    'Rich in natural antioxidants and adaptogenic minerals',
    'Formulated according to authentic Ayurvedic Charaka Samhita guidelines'
  ],
  ingredients: [
    { name: 'Organic Aloe Vera', botanicalName: 'Aloe barbadensis', role: 'Deep cellular hydration' },
    { name: 'Gotu Kola Extract', botanicalName: 'Centella asiatica', role: 'Collagen & elasticity rejuvenation' }
  ],
  dosageInstructions: 'Apply 2-3 drops or a dime-sized amount gently in circular upward motions.',
  certifications: ['Certified Organic', '100% Ayurvedic', 'Cruelty-Free', 'Recyclable Glass']
};

export const AdminProductsPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    formatPrice,
    addToast
  } = useCommerce();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'lowstock'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(INITIAL_EMPTY_PRODUCT);

  // New Benefit / Ingredient temporary inputs
  const [tempBenefit, setTempBenefit] = useState('');
  const [tempIngName, setTempIngName] = useState('');
  const [tempIngBot, setTempIngBot] = useState('');
  const [tempIngRole, setTempIngRole] = useState('');

  // Delete Confirm Modal
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (stockFilter === 'instock' && !p.inStock) return false;
      if (stockFilter === 'lowstock' && (p.inStock && (p.stockCount ?? 100) > 20)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCat) return false;
      }
      return true;
    });
  }, [products, selectedCategory, stockFilter, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData(INITIAL_EMPTY_PRODUCT);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      slug: product.slug,
      name: product.name,
      tagline: product.tagline,
      category: product.category,
      healthConcern: product.healthConcern,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      rating: product.rating,
      reviewCount: product.reviewCount,
      image: product.image,
      hoverImage: product.hoverImage,
      gallery: product.gallery || [product.image],
      tag: product.tag || '',
      volume: product.volume,
      sku: product.sku,
      inStock: product.inStock,
      stockCount: product.stockCount ?? 100,
      featured: product.featured || false,
      bestseller: product.bestseller || false,
      isNew: product.isNew || false,
      description: product.description,
      keyBenefits: product.keyBenefits || [],
      ingredients: product.ingredients || [],
      dosageInstructions: product.dosageInstructions,
      certifications: product.certifications || []
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0) {
      addToast('Please enter a valid formulation name and price', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      addToast(`Updated "${formData.name}" successfully`, 'success');
    } else {
      addProduct(formData);
      addToast(`Added "${formData.name}" to dispensary`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleAddBenefit = () => {
    if (!tempBenefit.trim()) return;
    setFormData((prev) => ({
      ...prev,
      keyBenefits: [...prev.keyBenefits, tempBenefit.trim()]
    }));
    setTempBenefit('');
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyBenefits: prev.keyBenefits.filter((_, i) => i !== index)
    }));
  };

  const handleAddIngredient = () => {
    if (!tempIngName.trim()) return;
    const newIng: Ingredient = {
      name: tempIngName.trim(),
      botanicalName: tempIngBot.trim() || undefined,
      role: tempIngRole.trim() || 'Active botanical therapeutic'
    };
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIng]
    }));
    setTempIngName('');
    setTempIngBot('');
    setTempIngRole('');
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  return (
    <AdminLayout activeTab="products">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
            BOTANICAL INVENTORY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
            Formulations Catalog ({products.length})
          </h1>
          <p className="text-xs text-[#1a1c18]/60 mt-1 font-body">
            Manage product listings, pricing, stock levels, botanical actives, and certifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={resetProductsToDefault}
            title="Reset to default formulations"
            className="px-4 py-2.5 bg-white border border-[rgba(26,28,24,0.12)] hover:bg-[#f2f2ef] rounded-full text-xs font-medium text-[#1a1c18] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#dac5a7]" />
            <span>Add Formulation</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by formulation name, SKU, or category..."
            className="w-full pl-9 pr-4 py-2 bg-[#f5f4ef] border border-[rgba(26,28,24,0.08)] rounded-2xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['All', ...CATEGORIES.filter((c) => c !== 'All Products')].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#3c4433] text-white shadow-xs'
                  : 'bg-[#f2f2ef] text-[#1a1c18]/70 hover:bg-[#e8e8e1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stock status filter */}
        <div className="flex items-center gap-1 border-t md:border-t-0 md:border-l border-[rgba(26,28,24,0.08)] pt-2 md:pt-0 md:pl-3">
          <button
            onClick={() => setStockFilter('all')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
              stockFilter === 'all' ? 'bg-[#1a1c18] text-white' : 'text-[#1a1c18]/60 hover:bg-[#f2f2ef]'
            }`}
          >
            All Stock
          </button>
          <button
            onClick={() => setStockFilter('lowstock')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
              stockFilter === 'lowstock' ? 'bg-amber-600 text-white' : 'text-amber-800 bg-amber-50'
            }`}
          >
            Low / Out
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#fbfbf9] border-b border-[rgba(26,28,24,0.08)] text-[10px] font-mono uppercase text-[#1a1c18]/50">
                <th className="py-3.5 px-6 font-semibold">Formulation</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">SKU &amp; Volume</th>
                <th className="py-3.5 px-4 font-semibold">Price (MRP)</th>
                <th className="py-3.5 px-4 font-semibold">Stock Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(26,28,24,0.04)]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#1a1c18]/50">
                    No formulations match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#fbfbf9] transition-colors">
                    {/* Formulation info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-[#f2f2ef] shrink-0 border border-[rgba(26,28,24,0.08)]"
                        />
                        <div className="max-w-xs">
                          <p className="font-medium text-[#1a1c18]">{product.name}</p>
                          <span className="text-[10px] text-[#1a1c18]/50 line-clamp-1">
                            {product.tagline}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 font-medium text-[#1a1c18]/80">
                      {product.category}
                    </td>

                    {/* SKU & Volume */}
                    <td className="py-4 px-4 font-mono text-[11px] text-[#1a1c18]/70">
                      <div>{product.sku}</div>
                      <div className="text-[10px] text-[#757d5c]">{product.volume}</div>
                    </td>

                    {/* Pricing */}
                    <td className="py-4 px-4 font-mono">
                      <div className="font-bold text-[#1a1c18]">{formatPrice(product.price)}</div>
                      {product.compareAtPrice > product.price && (
                        <div className="text-[10px] text-[#1a1c18]/40 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </div>
                      )}
                    </td>

                    {/* Stock status toggle */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() =>
                          updateProduct(product.id, { inStock: !product.inStock })
                        }
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold transition-colors cursor-pointer ${
                          product.inStock
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-800 hover:bg-red-100'
                        }`}
                      >
                        {product.inStock ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>In Stock ({product.stockCount ?? 100})</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Sold Out</span>
                          </>
                        )}
                      </button>
                    </td>



                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 rounded-lg bg-[#f2f2ef] hover:bg-[#e8e8e1] text-[#1a1c18] transition-colors"
                          title="Edit Formulation"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                          title="Archive Formulation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EDIT / CREATE MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[rgba(26,28,24,0.1)]">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                  APOTHECARY FORMULATION EDITOR
                </span>
                <h3 className="font-serif text-2xl text-[#1a1c18]">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'New Botanical Formulation'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f2f2ef] text-[#1a1c18]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              {/* Row 1: Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Formulation Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="E.g., Saffron Radiant Elixir"
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="E.g., 100% cold-pressed organic actives"
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>
              </div>

              {/* Row 2: Category, SKU, Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Products').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="RY-BOT-001"
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Volume / Net Wt.
                  </label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="50 ml / 100 g"
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>
              </div>

              {/* Row 3: Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Selling Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                    min={1}
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    MRP / Compare At (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                    min={1}
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stockCount ?? 100}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    min={0}
                    className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                  />
                </div>
              </div>

              {/* Flags checkboxes */}
              <div className="flex flex-wrap items-center gap-5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded text-[#3c4433]"
                  />
                  <span>Available In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-[#3c4433]"
                  />
                  <span>Featured on Home Page</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="rounded text-[#3c4433]"
                  />
                  <span>Bestseller Tag</span>
                </label>
              </div>

              {/* Image URLs */}
              <div className="space-y-2 text-xs">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block">
                  Primary Media Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/..."
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl font-mono text-[11px]"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 text-xs">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block">
                  Description &amp; Editorial Lore
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
                />
              </div>

              {/* Botanical Ingredients List */}
              <div className="p-4 bg-[#fbfbf9] rounded-2xl border border-[rgba(26,28,24,0.08)] space-y-3 text-xs">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#757d5c] font-bold block">
                  Botanical Actives &amp; Ingredients
                </label>

                <div className="space-y-1.5">
                  {formData.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-white rounded-xl border border-[rgba(26,28,24,0.06)]"
                    >
                      <div>
                        <strong>{ing.name}</strong>{' '}
                        {ing.botanicalName && (
                          <span className="italic text-[#1a1c18]/60">({ing.botanicalName})</span>
                        )}
                        <span className="text-[#1a1c18]/50 block text-[11px]">{ing.role}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new ingredient */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[rgba(26,28,24,0.06)]">
                  <input
                    type="text"
                    value={tempIngName}
                    onChange={(e) => setTempIngName(e.target.value)}
                    placeholder="Common name (e.g. Neem)"
                    className="px-2.5 py-1.5 bg-white border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={tempIngBot}
                    onChange={(e) => setTempIngBot(e.target.value)}
                    placeholder="Botanical (e.g. Azadirachta)"
                    className="px-2.5 py-1.5 bg-white border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={tempIngRole}
                    onChange={(e) => setTempIngRole(e.target.value)}
                    placeholder="Role (e.g. Purifying)"
                    className="px-2.5 py-1.5 bg-white border rounded-lg text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-3 py-1 bg-[#3c4433] text-white rounded-lg text-[11px] font-medium"
                >
                  + Add Active Ingredient
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(26,28,24,0.08)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border rounded-full text-xs font-medium text-[#1a1c18]/70 hover:bg-[#f2f2ef]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Formulation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto text-xl font-serif">
              !
            </div>
            <h4 className="font-serif text-xl text-[#1a1c18]">Archive Formulation?</h4>
            <p className="text-xs text-[#1a1c18]/60 leading-relaxed font-body">
              This will remove this formulation from the public storefront. You can reset to defaults anytime.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 border rounded-full text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-full text-xs font-medium"
              >
                Confirm Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
