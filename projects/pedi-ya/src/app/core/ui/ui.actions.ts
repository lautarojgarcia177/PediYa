import { createAction } from '@ngrx/store';

export const showSpinner = createAction('[Ui] Show Spinner');
export const hideSpinner = createAction('[Ui] Hide Spinner');