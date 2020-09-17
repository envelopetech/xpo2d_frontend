import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import {
  getbriefcase
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
export default function BriefcaseView() {
  const classes = useStyles();
  const { briefcase } = useSelector((state) => state.visitor);

  
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      pagename: "Briefcase"
  }
  dispatch(userpage_save(data)) 
    dispatch(getbriefcase());
  }, [dispatch]);

  if (briefcase !== undefined && briefcase.length === 0) {
    return <Skeleton></Skeleton>;
  }
  return (
    <Page
      className={classes.root}
      title="My Briefcase"
    >
      <Results exhibitors={briefcase}></Results>
    </Page>

  )
}