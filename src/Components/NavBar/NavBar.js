import React, { useState, useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DataContext } from "./../Context/DataContext";
import Logo from "../../Assets/Imgs/Logo.svg";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { pink } from "@mui/material/colors";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Person2Icon from "@mui/icons-material/Person2";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

export function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { favorite, Cart, StoreData, setCart, setFavorite } =
    useContext(DataContext);

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

  const searchFun = (e) => {
    setOpenSearch(true);
  };

  return (
    <nav>
      <IconButton
        className="menuBtn"
        onClick={() => {
          setOpenNav(!openNav);
        }}
      >
        <MenuIcon color="black" sx={{ fontSize: 25 }} />
      </IconButton>

      <div className="navLink">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/clothes">Clothes</NavLink>
        <NavLink to="/shoes">Shoes</NavLink>
        <NavLink to="/accessories">Accessories</NavLink>
      </div>

      <NavLink to="/" className="logo">
        <img src={Logo} alt="" />
      </NavLink>
      <div className="navItem">
        <form
          className="searchLabel"
          onSubmit={(e) => {
            e.preventDefault();
            searchFun(e);
            setSearch(e.target.search.value.toLowerCase());
            e.target.search.value = "";
          }}
        >
          <input type="text" placeholder="Search..." name="search" />

          <button className="searchBtn" onClick={(e) => {}}>
            <SearchIcon color="black" sx={{ fontSize: 25 }} />
          </button>
        </form>

        <NavLink to="/profil" className="navBtn">
          <PersonIcon color="black" sx={{ fontSize: 25 }} />
        </NavLink>

        <NavLink to="/cart" className="navBtn remember">
          {Cart.length > 0 ? (
            <span className="dataLength">{Cart.length}</span>
          ) : (
            ""
          )}
          <ShoppingCartIcon color="black" sx={{ fontSize: 25 }} />
        </NavLink>
        <NavLink to="/profil/favorite" className="navBtn remember">
          {favorite.length > 0 ? (
            <span className="dataLength">{favorite.length}</span>
          ) : (
            ""
          )}
          <FavoriteIcon color="black" sx={{ fontSize: 25 }} />
        </NavLink>
      </div>

      <Drawer
        open={openNav}
        onClose={() => {
          setOpenNav(false);
        }}
        anchor="left"
      >
        <div className="mediaNav">
          <NavLink onClick={() => setOpenNav(false)} to="/">
            <img src={Logo} alt="" />
          </NavLink>
          <div className="menuLink">
            <NavLink onClick={() => setOpenNav(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setOpenNav(false)} to="/clothes">
              Clothes
            </NavLink>
            <NavLink onClick={() => setOpenNav(false)} to="/shoes">
              Shoes
            </NavLink>
            <NavLink onClick={() => setOpenNav(false)} to="/accessories">
              Accessories
            </NavLink>
          </div>
          <label className="mediaNavItem">
            <NavLink to="/profil" className="navBtn">
              <PersonIcon color="black" sx={{ fontSize: 25 }} />
            </NavLink>

            <NavLink to="/cart" className="navBtn remember">
              {Cart.length > 0 ? (
                <span className="dataLength">{Cart.length}</span>
              ) : (
                ""
              )}
              <ShoppingCartIcon color="black" sx={{ fontSize: 25 }} />
            </NavLink>
            <NavLink to="/profil/favorite" className="navBtn remember">
              {favorite.length > 0 ? (
                <span className="dataLength">{favorite.length}</span>
              ) : (
                ""
              )}
              <FavoriteIcon color="black" sx={{ fontSize: 25 }} />
            </NavLink>
          </label>
        </div>
      </Drawer>
      <Drawer
        open={openSearch}
        onClose={() => {
          setOpenSearch(false);
        }}
        anchor="bottom"
      >
        <div id="search_container">
          {StoreData.filter(
            (item) => item.name.toLowerCase().indexOf(search) !== -1
          ).length === 0 && search !== "" ? (
            <>
              <p id="search_not_found">We don't have this product</p>
              <button
                onClick={() => {
                  setOpenSearch(false);
                }}
                id="search_continue"
              >
                CONTINUE SHOPPING
              </button>
            </>
          ) : StoreData.filter(
              (item) => item.name.toLowerCase().indexOf(search) !== -1
            ).length === 0 && search === "" ? (
            StoreData.map((item, i) => (
              <div key={item.id} id="paginateCard">
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
              </div>
            ))
          ) : (
            StoreData.filter(
              (item) => item.name.toLowerCase().indexOf(search) !== -1
            ).map((item, i) => (
              <div key={item.id} id="paginateCard">
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
              </div>
            ))
          )}
          <Button onClick={() => setOpenSearch(false)} className="closeBtn">
            Close Search Bar
          </Button>
        </div>
      </Drawer>
    </nav>
  );
}

export function ProfilNav() {
  return (
    <>
      <div className="profilNav">
        <NavLink to="account">ACCOUNT DASHBOARD</NavLink>
        <div className="profilNavLink">
          <NavLink to="account">
            <Person2Icon />
            <p> Account Information</p>
          </NavLink>

          <NavLink to="addres">
            <MenuBookIcon />
            <p> Address Book </p>
          </NavLink>

          <NavLink to="order">
            <CardGiftcardIcon />
            <p>My Orders</p>
          </NavLink>

          <NavLink to="favorite">
            <FavoriteIcon />
            <p>My Favorites</p>
          </NavLink>
        </div>
      </div>

      <div className="navCard">
        <NavLink to="/" className="logo2">
          <img src={Logo} alt="" />
        </NavLink>
        <NavLink to="account">
          <Person2Icon sx={{ fontSize: 30 }} />
        </NavLink>

        <NavLink to="addres">
          <MenuBookIcon sx={{ fontSize: 30 }} />
        </NavLink>

        <NavLink to="order">
          <CardGiftcardIcon sx={{ fontSize: 30 }} />
        </NavLink>

        <NavLink to="favorite">
          <FavoriteIcon sx={{ fontSize: 30 }} />
        </NavLink>
      </div>
    </>
  );
}
