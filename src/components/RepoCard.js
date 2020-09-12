import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1024
  },
}));

function RepoGridList(props) {
  const classes = useStyles();

  const getGridListCols = () => {
    console.log(props.width)
    if (isWidthUp('xl', props.width)) {
      return 3;
    }

    if (isWidthUp('lg', props.width)) {
      return 3;
    }

    if (isWidthUp('md', props.width)) {
      return 3;
    }

    return 2;
  }

  return (
    <div className={classes.root}>
      <GridList spacing={15} cellHeight={400} cols={getGridListCols()}>
        {props.tileData.map((tile, index) => (
          <GridListTile key={index} cols={tile.cols || 1}>
            <a href={tile.html_url}><img src={tile.owner.avatar_url} alt={tile.title} /></a>
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.name}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withWidth()(RepoGridList)