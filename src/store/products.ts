import { makeAutoObservable, action, runInAction } from "mobx";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

export interface Filters {
  category: string;
  priceRange: [number, number];
  rating: number;
}

class ProductStore {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: Product[] = [];
  categories: string[] = [];
  priceRange: [number, number] = [0, 1000];

  constructor() {
    makeAutoObservable(this, {
      fetchProducts: action,
      addToCart: action,
      removeFromCart: action,
      incrementCartItem: action,
      decrementCartItem: action,
      handleQuantityChange: action,
      applyFilters: action,
    });
  }

  async fetchProducts() {
    try {
      const response = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      runInAction(() => {
        this.products = response.data.map((product) => ({
          ...product,
          quantity: 0,
          rating: {
            ...product.rating,
            rate: this.roundRating(product.rating.rate),
          },
        }));
        this.filteredProducts = this.products;
        const uniqueCategories = new Set(
          response.data.map((product) => product.category)
        );
        this.categories = Array.from(uniqueCategories);
        const prices = this.products.map((product) => product.price);
        this.priceRange = [Math.min(...prices), Math.max(...prices)];
      });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }

  roundRating(rate: number): number {
    if (rate >= 1.0 && rate <= 1.4) return 1.0;
    if (rate >= 1.5 && rate <= 1.9) return 1.5;
    if (rate >= 2.0 && rate <= 2.4) return 2.0;
    if (rate >= 2.5 && rate <= 2.9) return 2.5;
    if (rate >= 3.0 && rate <= 3.4) return 3.0;
    if (rate >= 3.5 && rate <= 3.9) return 3.5;
    if (rate >= 4.0 && rate <= 4.4) return 4.0;
    if (rate >= 4.5 && rate <= 4.9) return 4.5;
    return 5.0;
  }

  addToCart(product: Product) {
    const existingProductIndex = this.cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  incrementCartItem(productId: number) {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.cart[index].quantity += 1;
    }
  }

  decrementCartItem(productId: number) {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      if (this.cart[index].quantity === 1) {
        this.removeFromCart(productId);
      } else {
        this.cart[index].quantity -= 1;
      }
    }
  }

  handleQuantityChange(productId: number, newQuantity: number) {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.cart[index].quantity = newQuantity;
    }
  }

  filterProducts(filters: Filters): Product[] {
    let filteredProducts = this.products;

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    filteredProducts = filteredProducts.filter(
      (product) => product.rating.rate >= filters.rating
    );

    return filteredProducts;
  }

  applyFilters(filters: Filters) {
    runInAction(() => {
      this.filteredProducts = this.filterProducts(filters);
    });
  }

  get cartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get cartItems() {
    return this.cart;
  }
}

const productStore = new ProductStore();
export default productStore;
