import { Home } from "./components/Home";
import SalesTeam from "./components/SalesTeam/SalesTeam";
import Products from "./components/Product/Products";
import Customers from "./components/Customers/Customers";
import SalesPersonDetail from "./components/SalesTeam/SalesPersonDetail";
import ProductDetail from "./components/Product/ProductDetail";
import Sales from "./components/Sales/Sales";
import NotFound from "./components/NotFound";

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
  {
    path: "/sales",
    element: <Sales />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default AppRoutes;
