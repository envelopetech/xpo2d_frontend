import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Box
} from '@material-ui/core';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         minHeight: '100%',
//         paddingTop: theme.spacing(3),
//         paddingBottom: theme.spacing(3)
//     },
//     divider: {
//         width: 0,
//         height: 32,
//         marginLeft: theme.spacing(2),
//         marginRight: theme.spacing(2)
//     }
// }));

export default function Variants() {
    //const classes = useStyles();
    return (
        <React.Fragment>
            <Box
                mt={4}
                display="flex"
                justifyContent="flex-end"
            >
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Box>
        </React.Fragment>

    );
}