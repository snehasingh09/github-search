import React, { useState } from 'react';
import logo from './images/gitlogo.png';
import './App.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Button } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


function App() {
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: '100%',
  //     maxWidth: 360,
  //     backgroundColor: theme.palette.background.paper,
  //   },
  // }));
  

  // const classes = useStyles();

  const[searchText, setSearchText] = useState("")
  const [alignmantPosition, setAlignmentPosition] = useState('center')

  const handleKeyPress = (e) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
    if(e.target.value.length){
      setAlignmentPosition('left')
    } else {
      setAlignmentPosition('center')
    }
  }

  return (
    <div>
      <div style={alignmantPosition === 'left' ? {'text-align': 'left'} : {'text-align': 'center'}} >
        <div className="main-container">
          <div className="main-subContainer" style={alignmantPosition === 'left' ? {'justify-content': 'left'} : {'justify-content': 'center', 'marginTop': '100px'}}>
              <img src={logo} className="logo"/>
              <div>
                <p className="header">GITHUB SEARCHER</p>
                <p className="subHeader">search user or repositories below</p>
              </div>
          </div>
          <div style={{'padding-left': '30px'}}>
            <TextField id="outlined-basic" variant="outlined"  placeholder="Start typing to search..." value={searchText} onChange={handleKeyPress} />
            <Select
              className="input-dropdown"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
