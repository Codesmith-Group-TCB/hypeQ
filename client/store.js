import create from 'zustand';

const data = [
];

const useStore = create((set) => ({
  searchInput: '',
  searchResult: [],
  list: [],
  watched: [],
  setSearchInput: (searchInput) => set((state) => ({ ...state, searchInput })),
  setSearchResult: (searchResult) =>
    set((state) => ({ ...state, searchResult })),
  setList: (list) => set((state) => ({ ...state, list })),
  setWatchedList: (watched) => set((state) => ({ ...state, watched})),
}));

export default useStore;
