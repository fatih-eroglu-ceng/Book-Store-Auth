'use client';
import Link from 'next/link';
import useFetch from '../hooks/useFetch';
import { Product } from '../types/product';

interface Category {
  id: number;
  name: string;
}

interface ProductsResponse {
  product: Product[];
}

const CategorySection = ({ category }: { category: Category }) => {
  const { data: productsData, error: productsError, isLoading } = useFetch<ProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${category.id}`
  );

  if (isLoading) return <div>Loading products for {category.name}...</div>;
  if (productsError) return <div>Error loading products for {category.name}</div>;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        <Link href={{ pathname: `/category/${category.id}`, query: { name: category.name } }} className="text-[#EF6B4A] font-semibold hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productsData?.product.slice(0, 4).map((product: Product) => (
          <Link href={{ pathname: `/book/${product.id}`, query: { name: product.name } }} key={product.id} className="bg-myGray p-4 rounded-lg border border-gray-300 flex">
            <img src={'/images/cover.png'} alt={product.name} className="h-auto w-1/3 object-cover shadow-lg" />
            <div className="flex flex-col justify-between flex-1 ml-4">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.author}</p>
              </div>
              <div className="mt-auto">
                <p className="text-right text-[#6251DD] font-semibold">{product.price.toFixed(2)} $</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Categories = () => {
  const { data: categoriesData, error: categoriesError, isLoading } = useFetch<{ category: Category[] }>(
    'https://assign-api.piton.com.tr/api/rest/categories'
  );

  if (isLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error loading categories</div>;

  return (
    <div className="py-10">
      {categoriesData?.category.map((category: Category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
