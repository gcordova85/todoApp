import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Layout from './presentation/Layout';
import TodoList from './presentation/TodoList';
import Edit from './presentation/EditTodo';

function App() {
  return (
    <div className="App" id="app">
      <Layout>
        <Router>
          <Switch>
              <Route exact path="/edit/:todoId">
                <Edit />
              </Route>
              <Route exact path="/">
                <TodoList />
              </Route>
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
