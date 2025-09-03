import { Web3Provider } from "./context/Web3.provider"
import Header from "./components/header"
import { Toaster } from "sonner"
import { Route } from "wouter"

// Pages
import Staking from "./pages/staking"
import Home from "./pages/home"


function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Web3Provider>
        <Header />
        <Route path='/' component={Home}/>
        <Route path='/staking' component={Staking}/>
      </Web3Provider>
      <footer className="flex items-center w-full pb-12 justify-center fixed bottom-0 left-0 ">
        <p className="text-zinc-500">
          Copyright © DApp. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default App
