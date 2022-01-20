import create from 'zustand';

const useStore = create((set) => ({
  rating: 0,
  searchInput: '',
  searchResult: [],
  list: [],
  setRating: (rating) => set((state) => ({ ...state, rating })),
  setSearchInput: (searchInput) => set((state) => ({ ...state, searchInput })),
  setSearchResult: (searchResult) =>
    set((state) => ({ ...state, searchResult })),
  setList: (list) => set((state) => ({ ...state, list })),
}));

export default useStore;
