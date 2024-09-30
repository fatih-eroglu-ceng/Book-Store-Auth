'use client';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import useCoverImage from '../../hooks/useCoverImage';
import { handleBackClick } from '../../utils/navigation';
import { handleAddToCart } from '../../utils/addCart';
import { handleFavoriteClick } from '../../utils/favorites';
import { Product } from '../../types/product';
import { RootState } from '../../redux/store';

const BookDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dispatch = useDispatch();
  const router = useRouter();

  const favoriteBooks = useSelector((state: RootState) => state.cart.favorites);

  const isBookFavorite = favoriteBooks.some(favorite => favorite.id === parseInt(id));

  const { data: productData, error: productError, isLoading } = useFetch<{ product_by_pk: Product }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`
  );

  const { coverImageUrl, error: coverError, isLoading: isCoverLoading } = useCoverImage(
    productData?.product_by_pk.cover ?? null
  );

  if (isLoading) return <div>Loading book details...</div>;
  if (productError) return <div>Error loading book details</div>;

  const book = productData?.product_by_pk;

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1
          onClick={() => handleBackClick(router)}
          className="text-2xl font-bold cursor-pointer hover:underline mb-6"
        >
          &lt; Book Details
        </h1>

        <button onClick={() => handleFavoriteClick(dispatch, book!, isBookFavorite)}>
          <img
            src={isBookFavorite ? '/images/filled.png' : '/images/empty.png'}
            alt="Favorite"
            className="w-8 h-8"
          />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 w-2/3">
          {isCoverLoading ? (
            <div>Loading cover...</div>
          ) : coverError ? (
            <div>Error loading cover image</div>
          ) : coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={book?.name}
              className="rounded-lg shadow-lg object-cover w-full"
            />
          ) : (
            <div>Cover image not available</div>
          )}
        </div>

        <div className="md:w-2/3 w-full relative">
          <h1 className="text-4xl font-bold mb-4">{book?.name}</h1>
          <h2 className="text-xl text-gray-500 mb-4">{book?.author}</h2>

          <h3 className="text-lg font-semibold mb-2 mt-16">Summary</h3>
          <p className="text-gray-600 mb-6 pb-10">{book?.description}</p>

          <div className="absolute bottom-0 right-0">
            <button
              onClick={() => handleAddToCart(dispatch, book)}
              className="bg-[#EF6B4A] text-white flex justify-between items-center px-6 py-3 rounded-md w-full max-w-xs"
            >
              <span className="text-lg font-bold">{book?.price.toFixed(2)} $</span>
              <span className="ml-4 font-semibold">Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
