import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { debounce } from 'lodash';


import { Octokit } from '@octokit/core';

import App from './App';
import * as serviceWorker from './serviceWorker';


var PER_PAGE = 12;


function qBuilder(state = {}, action) {
  //console.log(action)
  let updates = { qType: 'users', ...state }
  switch (action.type) {
    case 'qType':
    case 'qString':
      updates = { ...updates, ...action.payload }
      break
    case 'users':
      if (action.payload.query in updates.users){
        updates.users[action.payload.query]=[...updates.users[action.payload.query], ...action.payload.items]
      } else {
        updates.users[action.payload.query] = action.payload.items
      }
      updates.usersCount[action.payload.query] = action.payload.totalCount
      updates.more = false
      break
    case 'repositories':
      if (action.payload.query in updates.repositories){
        updates.repositories[action.payload.query]=[...updates.repositories[action.payload.query], ...action.payload.items]
      } else {
        updates.repositories[action.payload.query] = action.payload.items
      }
      updates.repositoriesCount[action.payload.query] = action.payload.totalCount
      updates.more = false
      break
    case 'more':
      updates.more = action.payload.more;
      break;
    default:
      return state
  }
  let result = { ...state, ...updates }
  console.log(state, updates, result)
  return result
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, qBuilder)

const store = createStore(persistedReducer, {
  qType: 'users',
  qString: '',
  users: {},
  usersCount: {},
  repositories: {},
  repositoriesCount: {},
  more: false
});

const octokit = new Octokit()

const getData = debounce(async (query, field, pageIndex = 1) => {
  console.log(query, field, pageIndex)
  try {
    let response = await octokit.request(`GET /search/${field}`, {
      q: query,
      per_page: PER_PAGE,
      page: pageIndex
    })
    console.log(response.data);
    store.dispatch({
      type: field,
      payload: {
        items: response.data?.items ? response.data?.items : [],
        query: query,
        totalCount: response.data.total_count
      }
    })
  }
  catch (error) {
    console.log(error)
    alert("Error :(")
  }
}, 100)

store.subscribe(() => {
  //console.log("from Subscription")
  console.log(store.getState())
  const { qString, qType, users, usersCount, repositories, repositoriesCount, more } = store.getState()
  let cmap = users;
  if (qType === 'repositories') {
    cmap = repositories
  }
  //console.log(cmap, qType)
  if (qString.length >= 3 && !(qString in cmap)) {
    getData(qString, qType)
  } else if (qString.length >= 3 && more === true) {
    cmap = usersCount
    let dmap = users
    if (qType === 'repositories') {
      cmap = repositoriesCount
      dmap = repositories
    }
    let icount = dmap[qString].length
    let mcount = cmap[qString]
    if(icount < mcount){
      let pageIndex = 1 * (icount/PER_PAGE) + 1
      getData(qString, qType, pageIndex)
    }
  }
})

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();