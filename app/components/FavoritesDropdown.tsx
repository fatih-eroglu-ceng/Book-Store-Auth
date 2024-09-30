'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';
import useCoverImage from '../hooks/useCoverImage';

const FavoritesDropdown = () => {
    const favoriteBooks = useSelector((state: RootState) => state.cart.favorites);

    return (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {favoriteBooks.length > 0 ? (
                <ul className="p-4">
                    {favoriteBooks.map(book => {
                        const { coverImageUrl, error, isLoading } = useCoverImage(book.cover);
                        return (
                            <li key={book.id} className="mb-2 last:mb-0">
                                <Link href={`/book/${book.id}`} className="flex items-center space-x-4">
                                    {isLoading ? (
                                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                                    ) : error ? (
                                        <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center">X</div>
                                    ) : (
                                        <img
                                            src={coverImageUrl ?? 'images/cover.png'}
                                            alt={book.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{book.name}</span>
                                        <span className="text-gray-500 text-sm">{book.author}</span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="p-4 text-gray-500">No favorite books yet.</div>
            )}
        </div>
    );
};

export default FavoritesDropdown;
