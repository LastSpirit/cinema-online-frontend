import { useTypedSelector } from './useTypedSelectors';

export const useAuth = () => useTypedSelector((state) => state.user);
