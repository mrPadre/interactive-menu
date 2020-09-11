import * as React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Card, CardHeader, Avatar, CardContent, Typography, CardActions, Theme} from '@material-ui/core';
import {Comment} from '../../service/store/reducer';
import {Rating} from '@material-ui/lab';

interface ICommentCardComponentProps {
    comment: Comment
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        margin: '10px 0'
    },
    header: {
        textAlign: 'left',
        padding: 8
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    },
    comment: {
        padding: '3px 8px',
    }
}))

const CommentCardComponent: React.FunctionComponent<ICommentCardComponentProps> = (props: ICommentCardComponentProps) => {
    const classes = useStyles();
  return (
    <Card elevation={3} className={classes.card}>
        <CardHeader 
        avatar={
            <Avatar className={classes.avatar}>
                {props.comment.name.substr(0, 2)}  
            </Avatar>
        }
        title={props.comment.name}
        className={classes.header}/>
        <CardContent className={classes.comment}>
            <Typography variant='body1' align='left' >
                {props.comment.comment}
            </Typography>
        </CardContent>
        <CardActions>
            <Rating value={props.comment.rating} readOnly />
        </CardActions>
    </Card>
  );
};

export default React.memo(CommentCardComponent);
