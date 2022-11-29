import React from "react";
import "./Profil.css"
// import { DataContext } from "../Components/Context/DataContext";
import { ProfilNav } from "../../Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import { Account } from "./Account";
import { Address } from "./Address";
import { Favorite } from "./Favorite";
import { Order } from "./Order";
// import { SignIn } from "./Sign";

export function Profil() {
  // const Data = useState(DataContext);

  return (
    <>
      <div className="profil">
        <ProfilNav />
        <div className="profilRout">
          <Routes >
            <Route path="/account" extand element={<Account />} />
            <Route path="/addres" element={<Address />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
