import { Action, createReducer, on } from "@ngrx/store";
import { UiState } from "./ui.models";
import * as uiActions from './ui.actions';

export const initialState: UiState = {
    isLoading: false,
};

const reducer = createReducer(
    initialState,
    on(uiActions.showSpinner, state => ({...state, isLoading: true})),
    on(uiActions.hideSpinner, state => ({...state, isLoading: false})),
);

export function uiReducer(state: UiState | undefined, action: Action): UiState {
    return reducer(state, action);
}