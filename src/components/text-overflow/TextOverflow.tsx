import React, {useMemo} from 'react';
import {makeStyles} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface Props {
    text: string;
    full: boolean;
    handleSetFull: () => void;
}

const useStyles = makeStyles(() => ({
    description: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

const TextOverflowComponent: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const arrow = useMemo(() => {
        if (!props.full && props.text.length >= 80) {
            return (
                <ExpandMoreIcon onClick={props.handleSetFull}/>
                   )
        } else if (props.full && props.text.length >= 80) {
            return (
                <ExpandLessIcon onClick={props.handleSetFull}/>
                   )
        } else return;

        }, [props.full, props.handleSetFull, props.text]);

        const newText = useMemo(() => {
            if (props.full) {
                return props.text
            } else {
                return props.text.substr(0, 80);
            }
        
        }, [props.full, props.text])



    return (
        <div className={classes.description}>
            {newText}
            {arrow}
        </div>
    )

}
export default React.memo(TextOverflowComponent);
