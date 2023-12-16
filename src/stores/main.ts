import { create } from 'zustand';
import * as Models from 'models';

type Store = {
  Coins: Models.Coin[];
  loading: boolean;
  setLoading: (status: boolean) => void;
};

const useStore = create<Store>((set) => ({
  Coins: [],
  loading: false,
  setLoading: (status) => set((state) => ({ ...state, loading: status })),
}));

export default useStore;
