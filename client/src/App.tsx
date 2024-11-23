
import "./App.css";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordProvider } from "./contexts/financial-record-context";

function App() {
  
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element ={<FinancialRecordProvider>
            <Dashboard/>
          </FinancialRecordProvider> }/>
          <Route path="/auth" element ={<Auth />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
