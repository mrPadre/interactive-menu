import React, {useMemo} from 'react';
import {makeStyles, Theme, CircularProgress} from '@material-ui/core';
import ProductCardComponent from '../product-card-component/ProductCardComponent';
import {v4} from 'uuid';
import {useSelector} from 'react-redux';
import {Store, Product} from '../../service/store/reducer';
import MenuContainerComponent from '../../components/menu-container-component/MenuContainerComponent';
import ProductBlockContainer from '../product-block-container/ProductBlockContainer';
import {CATEGORY, CategoryItem} from '../../consts/consts';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 0',
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

    const {allProducts: products} = useSelector((state: Store) => state);

    const content = useMemo(() => {
       if (products.length) {
        const elements = CATEGORY.map((item: CategoryItem) => {
            return (
                <ProductBlockContainer id={item.id} key={v4()} className={classes.container}>                 
                    {products.map((prod: Product) => {
                        if (prod.category === item.label) {
                            return (
                                <ProductCardComponent
                                product={prod}
                                key={v4()} 
                                />
                            )
                        }
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