import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// page & layout
import Homepage from "./pages/Homepage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import SiteHeader from "./components/SiteHeader";

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/details/:id" element={<ReviewDetails />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
