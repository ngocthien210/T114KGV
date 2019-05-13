// thêm các thành phần cần thiết của redux - compose dùng để dev tool debug
import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';


const initialState = {};
const middleware = [thunk]
const _Store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // thêm dev tool
        window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default _Store;