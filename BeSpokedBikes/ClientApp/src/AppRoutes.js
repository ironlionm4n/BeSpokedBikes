import { Home } from "./components/Home";
import SalesTeam from "./components/Sales/SalesTeam";
import Products from "./components/Product/Products";
import Customers from "./components/Customers/Customers";
import SalesPersonDetail from "./components/Sales/SalesPersonDetail";
import ProductDetail from "./components/Product/ProductDetail";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/sales-team",
    element: <SalesTeam />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
  {
    path: "/sales-team/:id",
    element: <SalesPersonDetail />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
];

export default AppRoutes;
