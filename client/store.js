import create from 'zustand';

const obj = {
  Title: 'Endgame',
  Year: '2020',
  imdbID: 'tt1230978',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
};

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
