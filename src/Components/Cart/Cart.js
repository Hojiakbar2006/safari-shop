import React from "react";
import { useContext } from "react";
import "./Cart.css";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../Components/Context/DataContext";

export function Cart() {
  const Data = useContext(DataContext);

  const navigate = useNavigate();

  const AddFavoriteCart = (item) => {
    if (Data.favorite.filter((fil) => fil.id === item.id).length === 0) {
      Data.setFavorite([...Data.favorite, { ...item }]);
      item.like = true;
    } else {
      Data.setFavorite((Favorite) =>
        Data.favorite.filter((fil) => fil.id !== item.id)
      );
      item.like = false;
    }
  };

  const DeleteCart = (i) => {
    let del = Data.Cart.filter((item, index) => index !== i);
    Data.setCart(del);
    console.log(Data.setCart(del));
  };

  // const AddCheckout = (item) => {
  //   Data.setCheckout([...Data.Checkout, { ...item }]);
  //   console.log(Data.Checkout);
  // };

  const minus = (id) => {
    Data.setCart(() =>
      Data.Cart.map((item) =>
        item.id === id
          ? {
              ...item,
              count: item.count > 1 ? item.count-- : 1,
            }
          : item
      )
    );
  };

  const plus = (id) => {
    Data.setCart(() =>
      Data.Cart.map((item) =>
        item.id === id
          ? {
              ...item,
              count: item.count + 1,
            }
          : item
      )
    );
  };

  return (
    <>
      {Data.Cart.length === 0 ? (
        <di id="Cart">
          <p id="noproduct">No Product</p>
        </di>
      ) : (
        <div id="Cart">
          <table>
            <tbody>
              <tr>
                <td>ITEM DESCRIPTION</td>
                <td>QUANTITY</td>
                <td>UNIT PRICE</td>
                <td>SUB TOTAL</td>
              </tr>
              {Data.Cart.map((item, index) => {
                return (
                  <tr key={index} id="cart_card">
                    <td id="productCard">
                      <figure id="figure">
                        <img src={item.productImg} alt="" />
                      </figure>
                      <div id="cart_detail">
                        <h3>{item.name}</h3>
                        <p>
                          Size: {""}
                          {item.size}
                        </p>
                        <div id="btn-gr">
                          <Button>
                            <label id="favoriteLabel">
                              <Checkbox
                                checked={item.like}
                                icon={
                                  <FavoriteBorder sx={{ color: pink[600] }} />
                                }
                                checkedIcon={
                                  <Favorite sx={{ color: pink[500] }} />
                                }
                                onClick={() => AddFavoriteCart(item)}
                              />
                              <p id="favorite">MOVE TO FAVORITES</p>
                            </label>
                          </Button>
                          <Button onClick={() => DeleteCart(index)}>
                            <DeleteForeverIcon /> <p id="remove">REMOVE</p>
                          </Button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div id="plus_minus_btn">
                        <button onClick={() => plus(item.id)}>+</button>
                        <p>{item.count}</p>
                        <button onClick={() => minus(item.id)}>-</button>
                      </div>
                    </td>
                    <td>??? {item.totalPrice}</td>
                    <td>??? {item.count * item.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="cart_detail">
            <div id="cart_total_card">
              <p>
                Total: {""}
                <span>
                  ??? {""}
                  {Data.Cart.reduce((a, b) => a + b.count * b.totalPrice, 0)}$
                </span>
              </p>
              <p>Delivery fee not included yet</p>
            </div>
            <div id="cart_detail_btns">
              <button onClick={() => navigate(-1)}>CONTINUE SHOPPING</button>
              <NavLink to="checkout">PROCEED TO CHECKOUT</NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
