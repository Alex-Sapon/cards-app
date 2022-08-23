import {useMemo} from 'react';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from '../../app/store';

// export const useAppDispatch = () => useDispatch<ThunkDispatch<RootStateType, unknown, RootActionsType>>();
// export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();

    const boundActions = useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch])

    return boundActions;
}