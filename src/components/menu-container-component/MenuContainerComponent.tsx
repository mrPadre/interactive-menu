import React, {useMemo, useCallback, useState} from 'react';
import {makeStyles, Tab, Theme} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {uuid} from 'uuidv4';
import {useSelector} from 'react-redux';
import {Store} from '../../service/store/reducer';
import {Link} from 'react-scroll';

const useStyles = makeStyles((theme: Theme) => ({
    selectItem: {
        borderBottomStyle: 'solid',
        borderWidth: 5,
        borderBottomColor: `${theme.palette.secondary.main}!important`,
        [theme.breakpoints.down('sm')]: {
            display: 'flex!important',
        }
    },
    item: {
        width: '100%',
        borderBottomStyle: 'solid',
        borderWidth: 5,
        borderBottomColor: 'white',
        margin: 'auto',
        transition: 'all 0.5s linear',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        zIndex: 100
    },
    open: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            margin: 'auto'
        },
    },
     arrow: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 'calc(100% - 20px)',
        left: 'calc(50% - 20px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 5,
        cursor: 'pointer',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '100%',
        position: 'sticky',
        minHeight: 60,
        backgroundColor: 'white',
        top: 0,
        zIndex: 200,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    max: {
        height: 'auto',
    },
    tab: {
        fontSize: '1.3em'
    }
}));

interface Menu {
    label: string;
    href: string;
}

interface Enum {
    [key:string]: string;
}

const CategoryName: Enum = {
    'pie': 'Пироги',
    'salad': 'Салат',
    'second': 'Горячее',
    'juse' : 'Напитки',
    'bread' : 'Хлеб',
}

const MenuContainerComponent: React.FC = () => {
    const classes = useStyles();
    const {products} = useSelector((state: Store) => state);

    const [isOpen, setIsOpen] = useState(false);
    const menu = useMemo(() => {
        const arr: Menu[] = [];
            products.map((item) => {
                const elem = {label: item.id, href:`#${item.id}`};
                return arr.push(elem)
            });
        return arr;
    }, [products])

    const showMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const arrow = useMemo(() => {
        if (isOpen) {
            return (
                <ExpandLessIcon />
            )
        } else {
            return (
                <ExpandMoreIcon />      
            )
        }
    }, [isOpen])

    const container = useMemo(() => {
        const show = [classes.menuContainer, classes.max]
        if (isOpen) {
            return show.join(' ');
        } else {
            return classes.menuContainer;
        }
    }, [isOpen, classes.menuContainer, classes.max]);

    const item = useMemo(() => {
        const show =[classes.item , classes.open];
        if (isOpen) {
             return show.join(' ');
        } else {
             return classes.item
        }
    }, [isOpen, classes.item, classes.open]);

    const handleGoTo = useCallback(() => {
        console.log()
        showMenu()
    },[showMenu])

    const renderMenu = useMemo( () => {
        return menu.map((elem) => {
            return (
                <Link
                activeClass={classes.selectItem}
                key={uuid()}
                to={elem.label}
                spy={true}
                smooth={true}
                offset={-210}
                duration= {500}
                className={item}
            > 
            <Tab label={CategoryName[elem.label]} key={uuid()} className={classes.tab} onClick={handleGoTo}/>
            </Link>
                
            )
        })
    }, [item, showMenu, menu]);


    return (
        <div className={container} >
            {renderMenu}
            <div  className={classes.arrow} onClick={showMenu}>{arrow}</div>
        </div>
    )
}
export default React.memo(MenuContainerComponent);
