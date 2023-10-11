import { Suspense } from "react";

// project imports
import Loader from "./Loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export default Loadable;
