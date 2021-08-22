import { createStore } from 'redux'
import userDataReducer from './form.reducer'

const store = createStore(userDataReducer)

store.subscribe(() => {
    console.log('current state', store.getState());
});

export default store
