import { Web3Provider } from "./context/Web3.provider";
import Header from "./components/header";
import { Toaster } from "sonner";
import { Route } from "wouter";

// Pages
import Staking from "./pages/staking";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Web3Provider>
        <Header />
        <Route path="/" component={Home} />
        <Route path="/staking" component={Staking} />
      </Web3Provider>
    </>
  );
}

export default App;
