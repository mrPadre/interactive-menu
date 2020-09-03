import React from 'react';

interface Props {
    children: React.ReactNode;
    className: string;
    id: string;
}

const ProductBlockContainer: React.FC <Props> = (props: Props) => {
    return (
        <div className={props.className} id={props.id}>
            {props.children}
        </div>
    )
}
export default ProductBlockContainer;