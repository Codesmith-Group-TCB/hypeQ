import create from 'zustand';


const useStore = create((set) => ({
  searchInput: '',
  searchResult: [],
  list: [],
  setSearchInput: (searchInput) => set((state) => ({ ...state, searchInput })),
  setSearchResult: (searchResult) =>
    set((state) => ({ ...state, searchResult })),
  setList: (list) => set((state) => ({ ...state, list })),
}));

export default useStore;