import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop.jsx";
import Checkout from "./pages/Checkout.jsx";
import Blog from "./pages/Blog.jsx";
import Brands from "./pages/Brands.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SignIn from "./pages/SignIn.jsx";
import Register from "./pages/Register.jsx";
import ReturnPolicy from "./pages/ReturnPolicy.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "shop", element: <Shop /> },
      { path: "shop/:slug", element: <Shop /> },
      { path: "checkout", element: <Checkout /> },
      { path: "blog", element: <Blog /> },
      { path: "brands", element: <Brands /> },
      { path: "products/:slug", element: <ProductDetails /> },
      { path: "about-us", element: <About /> },
      { path: "contact-us", element: <Contact /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "register", element: <Register /> },
      { path: "return-policy", element: <ReturnPolicy /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-conditions", element: <TermsConditions /> },
      { path: "shipping-delivery-policy", element: <ShippingPolicy /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
