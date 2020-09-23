import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import {
  getexhibitorassets
} from 'src/slices/exhibitor';
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  agendaContainer: {
    marginTop: '1em',
  }
});
export default function ResourceView() {
  const classes = useStyles();
  const { exhibitorassets } = useSelector((state) => state.exhibitor);

  const eventId = localStorage.getItem("eventId")
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      pagename: "Resources"
    }
    dispatch(userpage_save(data));
    dispatch(getexhibitorassets(eventId));
  }, [dispatch]);

  if (exhibitorassets !== undefined && exhibitorassets.length === 0) {
    return <Skeleton></Skeleton>;
  }
  return (
    <Page
      className={classes.root}
      title="My Resources"
    >

      <Results exhibitors={exhibitorassets}></Results>
    </Page>

  )
}