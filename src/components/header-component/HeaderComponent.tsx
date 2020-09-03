import React from 'react';
import {makeStyles} from '@material-ui/core';
import Logo from '../../img/logo.png';

const useStyle = 
    makeStyles(() => ({
        header: {
            display: 'flex',
            width: '100%',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            height: 130,
            zIndex: 360
        },
        logo: {
            width: 300,
            margin: 10,
            left: 'calc(50% - 160px)',
            position: 'absolute',
            filter: 'drop-shadow(2px 2px 2px black)',
            zIndex: 360
        }
    }));

const HeaderComponent: React.FC = () => {
    
    const classes = useStyle();
    return (
        <div className={classes.header}>
            <img src={Logo} alt="logo" className={classes.logo}/>
        </div>
    )

}
export default React.memo(HeaderComponent);
