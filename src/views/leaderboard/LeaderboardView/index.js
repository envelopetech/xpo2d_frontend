import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import {
  getleaderboard
} from 'src/slices/visitor';
import {
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Skeleton from 'src/components/Skeletonresource';
import Results from './Results';
import { userpage_save } from 'src/slices/notification'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 15,
  },
  tablewrapper: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default function LeaderboardView() {
  const classes = useStyles();
  const { leaderboard } = useSelector((state) => state.visitor);


  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      pagename: "LeaderBoard"
    }
    dispatch(userpage_save(data))
    dispatch(getleaderboard());
  }, [dispatch]);

  if (leaderboard !== undefined && leaderboard.length === 0) {
    return <Skeleton></Skeleton>;
  }
  return (
    <Page
      className={classes.root}
      title="Leader Board"
    >
      <div className={classes.tablewrapper}>
        <Results exhibitors={leaderboard}></Results>
      </div>
    </Page>

  )
}