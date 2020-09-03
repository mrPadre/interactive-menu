import React, {useMemo} from 'react';
import {makeStyles, Theme, CircularProgress} from '@material-ui/core';
import ProductCardComponent from '../product-card-component/ProductCardComponent';
import {uuid} from 'uuidv4';
import {useSelector} from 'react-redux';
import {Store, Product, Category} from '../../service/store/reducer';
import MenuContainerComponent from '../../components/menu-container-component/MenuContainerComponent';
import ProductBlockContainer from '../product-block-container/ProductBlockContainer';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        margin: '10px 0'
        
    },
    img: {
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        width: 600,
        margin: 10
    },
    title: {
        margin: 5,
        fontSize: '1.2em',
        textTransform: 'uppercase'
    },
    textArea: {
        width: '100%',
        height: 1000
    }
}));

const ProductContainerComponent: React.FC = () => {

    const classes = useStyles();

    const {products} = useSelector((state: Store) => state);

    const content = useMemo(() => {
       if (products.length) {
        const elements = products.map((item: Category) => {
            return (
                <ProductBlockContainer id={item.id} key={uuid()} className={classes.container}>                 
                    {item.products.map((prod: Product) => {
                        return (
                            <ProductCardComponent
                            product={prod}
                            key={uuid()} 
                            />
                        )
                    })}
                </ProductBlockContainer>
            )
        })
        return (
            <div> 
                <MenuContainerComponent />
                {elements}
            </div>
        )
       } else {
           return (<CircularProgress color={'secondary'}/>)
       }
    }, [products, classes.container]);
    
    return (
        <div>
            
            {content}
        </div>
    );
}
export default React.memo(ProductContainerComponent);