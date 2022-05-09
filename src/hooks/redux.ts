import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState, TypedDispatch } from '@/store';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
