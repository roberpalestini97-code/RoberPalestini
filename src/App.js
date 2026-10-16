import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import ProjectDetail from "./components/Projects/ProjectDetail";
import Resume from "./components/Resume/Resume";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { LikesProvider } from "./context/LikesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";
import "./theme.css";

function App() {
  const [load, updateLoad] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => updateLoad(false), 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <LikesProvider>
          <Router>
            <Preloader load={load} />
            <div className="App" id={load ? "no-scroll" : "scroll"}>
              <Navbar />
              <ScrollToTop />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/project/:id" component={ProjectDetail} />
                <Route path="/project" component={Projects} />
                <Route path="/about" component={About} />
                <Route path="/resume" component={Resume} />
                <Route component={Home} />
              </Switch>
              <Footer />
              <WhatsAppButton />
            </div>
          </Router>
        </LikesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
