import React, { useContext } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { DataContext } from "../../Components/Context/DataContext";
import { toast } from "react-toastify";


export function Favorite() {
  const {favorite, setFavorite, setCart, Cart } = useContext(DataContext);
  const deleteData = (i) => {
    let del = favorite.filter((item, index) => index !== i);
    setFavorite(del);

  };
  const AddCart = (item) => {
    if (Cart.filter((fil) => fil.id === item.id).length === 0){
      setCart([...Cart, { ...item }]);
      toast.dark("product added to the cart :) now you can buy the product from the !!! ", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast("This is a previously added product", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  return (
    <div id="fav">
      <div id="info">
        <p>My Order</p>
        <p>{favorite.length}</p>
      </div>

      {favorite.length === 0 ? (
        <p id="noProduct">No Product</p>
      ) : (
        <div id="fav-container">
          {favorite.map((item, index) => {
            return (
              <div id="f-card" key={index}>
                <div id="f-c-texts">
                  <figure id="f-c-t-img">
                    <img src={item.productImg} alt="" />
                  </figure>

                  <div id="f-c-text">
                    <p id="f-c-t-1">{item.name}</p>
                    <p id="f-c-t-2">Size: {item.size}</p>
                    <p id="f-c-t-3">₦ {item.totalPrice}</p>
                  </div>
                </div>

                <div id="f-c-btns">
                  <Button onClick={() => AddCart(item, index)}>BUY NOW</Button>

                  <Button
                    id="f-c-btn-del"
                    onClick={() => {
                      deleteData(index);
                    }}
                  >
                    <HighlightOffIcon />
                    remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
