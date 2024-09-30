'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import useFetch from '../../hooks/useFetch';
import { handleBackClick } from '../../utils/navigation';
import { Product } from '../../types/product';

const CategoryPage = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('name') || 'Category';

  const { data: productsData, error: productsError, isLoading } = useFetch<{ product: Product[] }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
  );

  if (isLoading) return <div>Loading products for category {categoryName}...</div>;
  if (productsError) return <div>Error loading products for category {categoryName}</div>;

  const products = productsData?.product ?? [];

  return (
    <div className="py-10 px-10">
      <h1
        onClick={() => handleBackClick(router)}
        className="text-2xl font-bold cursor-pointer hover:underline mb-6"
      >
        &lt; {categoryName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div>No products available for this category.</div>
        ) : (
          products.map((product: Product) => (
            <Link
              href={{ pathname: `/book/${product.id}`, query: { name: product.name } }}
              key={product.id}
              className="bg-myGray p-4 rounded-lg border border-gray-300 flex flex-col"
            >
              <img
                src={`/images/cover.png`}
                alt={product.name}
                className="h-auto w-1/2 object-cover mb-4 mx-auto"
              />
              <div className="flex justify-between items-center w-full mx-auto">
                <div>
                  <h3 className="text-md font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.author}</p>
                </div>
                <p className="text-[#6251DD] font-semibold text-lg">{product.price.toFixed(2)} $</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
