import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop.jsx";
import CartDrawer from "../components/cart/CartDrawer.jsx";
import AddToCartToast from "../components/cart/AddToCartToast.jsx";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <AddToCartToast />
    </div>
  );
}

export default AppLayout;
