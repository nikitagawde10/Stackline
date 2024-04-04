import "./App.css";
import { Header } from "./components/Header/Header";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { SalesTable } from "./components/SalesTable/SalesTable";
import { TimeSeriesGraph } from "./components/TimeSeriesGraph/TimeSeriesGraph";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <header className="top-header-container">
          <Header />
        </header>
        <main className="display-containers">
          <div className="product-details-container">
            <ProductDetails />
          </div>
          <div className="visualization-container">
            <TimeSeriesGraph />
            <SalesTable />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
