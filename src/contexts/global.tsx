import React, { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { BookType, GlobalContextType, GlobalPropsType } from '~/@types/context'

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const GlobalProvider: React.FC<GlobalPropsType> = ({ children }) => {
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)
  const [books, setBooks] = useState<BookType[]>([])
  const [myFavorites, setMyFavorites] = useState<BookType[]>([])
  const [search, setSearch] = useState<string>('')
  const [current_page, setCurrentPage] = useState<number>(1)
  const [total_page, setTotalPage] = useState<number>(1)

  useEffect(() => {
    const getMyFavorites = () => {
      const favoriteStorage = localStorage.getItem('myfavorites')
      if (favoriteStorage) {
        setMyFavorites(JSON.parse(favoriteStorage))
      }
    }
    getMyFavorites()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoaderVisible,
        setIsLoaderVisible,
        books,
        setBooks,
        myFavorites,
        setMyFavorites,
        search,
        setSearch,
        current_page,
        setCurrentPage,
        total_page,
        setTotalPage
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  return useContext<GlobalContextType>(GlobalContext);
};
