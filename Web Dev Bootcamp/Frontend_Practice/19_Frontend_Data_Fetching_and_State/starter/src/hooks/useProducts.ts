import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

export function useProducts(query: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO:
    // 1. Create AbortController instance
    // 2. Set loading true, error null
    // 3. Fetch from https://dummyjson.com/products/search?q=${query} with signal
    // 4. Update products state
    // 5. Cleanup function: controller.abort()
  }, [query]);

  return { products, loading, error, empty: !loading && !error && products.length === 0 };
}
