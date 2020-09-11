import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core';
import Logo from '../../img/logo.png';
import {useHistory} from 'react-router';

const useStyle = 
    makeStyles(() => ({
        header: {
            display: 'flex',
            width: '100%',
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 360
        },
        logo: {
            width: 300,
            margin: 10,
            filter: 'drop-shadow(2px 2px 2px black)',
            zIndex: 360
        }
    }));

const HeaderComponent: React.FC = () => {

    const history = useHistory();

    const handleGoToMain = useCallback(() => {
        history.push('/');
    }, [history])
    
    const classes = useStyle();
    return (
        <div className={classes.header}>
            <img src={Logo} alt="logo" className={classes.logo} onClick={handleGoToMain}/>
        </div>
    )

}
export default React.memo(HeaderComponent);
