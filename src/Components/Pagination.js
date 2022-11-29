import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { pink } from "@mui/material/colors";
import { DataContext } from "./Context/DataContext";
import { TopBtn } from "./Function";
import { toast } from "react-toastify";


export function ShowProduct({ Data }) {
  const [pageNUmber, setPageNumber] = useState(0);
  const usersPerPage = 12;
  const pagesVisited = pageNUmber * usersPerPage;
  const pageCount = Math.ceil(Data.length / usersPerPage);
  const { Cart, setCart, favorite, setFavorite } = useContext(DataContext);

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  const AddCart = (item) => {
    if (Cart.filter((fil) => fil.id === item.id).length === 0) {
      setCart([...Cart, { ...item }]);
      toast.dark("product added to the cart :)", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast("This is a previously added product", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };


  const AddFavorite = (item) => {
    if (favorite.filter((fil) => fil.id === item.id).length === 0) {
      setFavorite([...favorite, { ...item }]);
      item.like = true;
    } else {
      setFavorite((favorite) => favorite.filter((fil) => fil.id !== item.id));
      item.like = false;
    }
  };

  return (
    <div id="Container">
      {Data.length === 0 ? (
        <div id="messageCard">
          <h1>product not found</h1>
          <p>We do not have such a product</p>
        </div>
      ) : (
        <div id="SecContainer">
          {Data.slice(pagesVisited, pagesVisited + usersPerPage).map(
            (item, index) => {
              return (
                <div
                  key={index}
                  id="paginateCard"
                  data-aos="zoom-in-down"
                  data-aos-duration="500"
                >
                  <figure id="Figure">
                    <img src={item.productImg} alt="" />
                    <div className="btn-group">
                      <label onClick={() => AddFavorite(item)}>
                        <Checkbox
                          checked={item.like}
                          icon={<FavoriteBorder sx={{ color: pink[600] }} />}
                          checkedIcon={<Favorite sx={{ color: pink[500] }} />}
                        />
                      </label>
                      <Button
                        onClick={() => {
                          AddCart(item);
                        }}
                      >
                        ADD TO CART{" "}
                        <AddShoppingCartIcon sx={{ color: pink[500] }} />
                      </Button>
                    </div>
                  </figure>
                  <p>{item.name}</p>
                  <p>₦{item.totalPrice}</p>
                  <div id="added_btns">
                    <label onClick={() => AddFavorite(item)}>
                      <Checkbox
                        checked={item.like}
                        icon={<FavoriteBorder sx={{ color: pink[600] }} />}
                        checkedIcon={<Favorite sx={{ color: pink[500] }} />}
                      />
                    </label>
                    <Button
                      onClick={() => {
                        AddCart(item);
                      }}
                    >
                      <AddShoppingCartIcon sx={{ color: pink[500] }} />
                    </Button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
      <div id="Btn_Card">
        {Data.length < 12 ? (
          ""
        ) : (
          <ReactPaginate
            previousLabel={<ChevronLeftIcon />}
            nextLabel={<ChevronRightIcon />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination_btns"}
            previousLinkClassName={"previuos_btns"}
            nextLinkClassName={"next_btn"}
            disabledClassName={"pagination_disabled"}
            activeClassName={"pagination_active"}
          />
        )}
        {Data.length < 6 ? "" : <TopBtn />}
      </div>
    </div>
  );
}
