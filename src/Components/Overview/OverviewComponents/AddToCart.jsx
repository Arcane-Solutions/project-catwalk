import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { OverviewContext } from '../index.jsx';

const AddStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: inherit;
  position: relative;
  top: -20px;
  width: 40%;

  .size-and-quantity {
    flex-direction: row;
    select {
      margin-left: 5px;
      width: min-content;
    }
  }

  .out-of-stock {
    bottom: -2em;
    left: 5px;
    margin: 0;
    padding: 0;
    position: absolute;
    width: fit-content;
  }

`;

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const parseStock = (stock) => {
  const parsedStock = {};
  Object.entries(stock).forEach((sku) => {
    parsedStock[sku[1].size] = {
      quantity: sku[1].quantity,
      sku: sku[0],
    };
  });
  return parsedStock;
};

function AddToCart() {
  const stock = useContext(OverviewContext).currentStyleSelection.skus;
  const [sizeSelection, setSizeSelection] = useState('Select Size');
  const [stockQuantity, setStockQuantity] = useState(0);
  const [quantitySelection, setQuantitySelection] = useState(1);


  useEffect(() => {
    setSizeSelection('Select Size');
    setStockQuantity(0);
  }, [stock]);

  const handleSizeSelect = (event) => {
    const sizesAndStock = parseStock(stock);
    if (!sizesAndStock[event.target.value]) {
      setSizeSelection(event.target.value);
      setStockQuantity(-1);
      return;
    }
    setSizeSelection(event.target.value);
    setStockQuantity(sizesAndStock[event.target.value].quantity);
  };

  const handleQuantitySelect = (event) => {
    setQuantitySelection(event.target.value);
  };

  const handleAddToCart = () => {
    const sizesAndStock = parseStock(stock);
    axios.post('shopdata/cart', {
      sku: sizesAndStock[sizeSelection].sku,
      quantity: quantitySelection,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let quantityAndAddToCart = null;
  if (stockQuantity === -1) {
    quantityAndAddToCart = <span className="out-of-stock">Out Of Stock</span>;
  } else {
    quantityAndAddToCart = (
      <select
        data-analytics-id="quantity-selection"
        value={quantitySelection}
        onChange={handleQuantitySelect}
      >
        {quantities.map((number) => {
          if (number <= stockQuantity && number <= 15) {
            return <option label={number} value={number} />;
          }
          return null;
        })}
      </select>
    );
  }

  return (
    <AddStyle>
      <div className="size-and-quantity">
        <select
          data-analytics-id="size-selection"
          value={sizeSelection}
          onChange={handleSizeSelect}
        >
          {(sizeSelection === 'Select Size')
            ? <option label="Size" /> : null}
          {sizes.map((size) => <option label={size} value={size} />)}
        </select>
        {stockQuantity ? quantityAndAddToCart : null}
      </div>
      {(stockQuantity === -1)
        ? null
        : <button type="button" onClick={handleAddToCart}>Add To Cart</button>}
    </AddStyle>
  );
}

export default AddToCart;
