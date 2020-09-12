import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import logo from './images/gitlogo.png';
import './App.css';
import Select from '@material-ui/core/Select';
import { TextField, Button } from "@material-ui/core";
import UserCard from './components/UserCard';
import RepoCard from './components/RepoCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function App() {

  const classes = useStyles();

  const qString = useSelector(state => {
    return state.qString
  }, '')
  const qType = useSelector(state => {
    return state.qType
  }, '')
  const users = useSelector(state => {
    return state.users
  }, {})
  const repositories = useSelector(state => state.repositories, {})
  useEffect(() => {
    console.log(users[qString]);
  }, [qString, users])
  const dispatch = useDispatch()
  const updateQString = value => {
    dispatch({
      type: 'qString',
      payload: {
        qString: value
      }
    })
  }
  const updateQType = value => {
    dispatch({
      type: 'qType',
      payload: {
        qString: '',
        qType: value
      }
    })
  }
  const getMore = () => {
    dispatch({
      type: 'more',
      payload: {
        more: true
      }
    })
  }

  return (
    <div className={classes.root}>
      <div style={qString.length > 0 ? { 'textAlign': 'left' } : { 'textAlign': 'center' }} >
        <div className="main-container">
          <div className="main-subContainer" style={qString.length > 0 ? { 'justifyContent': 'left' } : { 'justifyContent': 'center', 'marginTop': '100px' }}>
            <img src={logo} alt="some error" className="logo" />
            <div>
              <p className="header">GITHUB SEARCHER</p>
              <p className="subHeader">search user or repositories below</p>
            </div>
          </div>
          <div style={{ 'paddingLeft': '30px' }}>
            <TextField id="outlined-basic" variant="outlined" placeholder="Start typing to search..." value={qString} onChange={(event) => { updateQString(event.target.value) }} />

            <Select
              native
              className="input-dropdown"
              label="Type"
              value={qType}
              inputProps={{
                name: 'qtype',
                id: 'qtype',
              }}
              onChange={(event) => { updateQString(""); updateQType(event.target.value); }}
            >
              <option value={'users'}>Users</option>
              <option value={'repositories'}>Repositories</option>
            </Select>
            <div style={{ 'paddingTop': '30px' }}>
              {users[qString] && qType === 'users' ?
                <UserCard
                  tileData={users[qString]} />
                : null}
              {repositories[qString] && qType === 'repositories' ?
                <RepoCard
                  tileData={repositories[qString]} />
                : null}
              {(repositories[qString] && qType === 'repositories') || (users[qString] && qType === 'users') ?
                (<div>
                  <Button onClick={() => getMore()}>
                    More
                </Button>
                </div>) : null}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
