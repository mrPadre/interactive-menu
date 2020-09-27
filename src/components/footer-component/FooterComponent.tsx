import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: 52,
        width: '100%',
        position: 'relative',
        bottom: 0
    }
}))

const FooterComponent: React.FunctionComponent = () => {
    const classes = useStyles();
  return (
      <div className={classes.container}>
          <Typography>
              
          </Typography>
      </div>
  ) ;
};

export default React.memo(FooterComponent);
