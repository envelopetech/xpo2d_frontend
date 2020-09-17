import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    divider: {
        width: 0,
        height: 32,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

export default function Variants() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className="users">
                <div className="current-user-container">
                    {
                        <div>
                            <Skeleton variant="circle" width={120} height={120} />
                            <div className="current-user-info">
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                            </div>
                        </div>
                    }
                </div>
                <div className="users-container">
                    <ul>

                        <li className="user">
                            <Skeleton variant="circle" width={120} height={120} />
                            <div className="user-info-container">
                                <div className="user-info">
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className="user-action">
                                    <button > <Skeleton variant="text" /></button>
                                </div>
                            </div>
                        </li>
                        <li className="user">
                            <Skeleton variant="circle" width={120} height={120} />
                            <div className="user-info-container">
                                <div className="user-info">
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className="user-action">
                                    <button > <Skeleton variant="text" /></button>
                                </div>
                            </div>
                        </li>
                        <li className="user">
                            <Skeleton variant="circle" width={120} height={120} />
                            <div className="user-info-container">
                                <div className="user-info">
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className="user-action">
                                    <button > <Skeleton variant="text" /></button>
                                </div>
                            </div>
                        </li>
                        <li className="user">
                            <Skeleton variant="circle" width={120} height={120} />
                            <div className="user-info-container">
                                <div className="user-info">
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className="user-action">
                                    <button > <Skeleton variant="text" /></button>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </React.Fragment>

    );
}