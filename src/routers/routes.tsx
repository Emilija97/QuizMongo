import * as React from "react";
import { Route, Switch, Redirect } from "react-router";
import HomePage from "../components/HomePage";
import QuestionList from "../components/QuestionList";
import ToSelectQuestion from "../components/ToSelectQuestion";
import SelectedQuestion from "../components/SelectedQuestion";
import AddDeleteQuestion from "../components/AddDeleteQuestion";
import ChosenNumber from "../components/ChosenNumber";
import ShowResults from "../components/ShowResults";
import LoginPage from "../components/LoginPage";
import Register from "../components/Register";
import PaginationComponent from "../components/PaginationComponent";
import Account from "../components/Account";
import CardPage from "../components/CardPage";
import ShowCards from "../components/ShowCards";
import EditCard from "../components/EditCard";
import DeleteCard from "../components/DeleteCard";

export const Routes = () => (
  <Switch>
    <Route exact path={"/"} component={LoginPage} />
    <Route path={"/Register"} component={Register} />
    <Route path={"/HomePage"} component={HomePage} />
    <Route exact path={"/ShowResults"} component={ShowResults} />
    <Route path={"/QuestionList"} component={QuestionList} />
    <Route path={"/ToSelectQuestion"} component={ToSelectQuestion} />
    <Route path={"/SelectedQuestion"} component={SelectedQuestion} />
    <Route path={"/AddDeleteQuestion"} component={AddDeleteQuestion} />
    <Route path={"/ChosenNumber"} component={ChosenNumber} />
    <Route path={"/PaginationComponent"} component={PaginationComponent} />
    <Route path={"/Account"} component={Account} />
    <Route path={"/CardPage"} component={CardPage} />
    <Route path={"/ShowCards"} component={ShowCards} />
    <Route path={"/EditCard"} component={EditCard} />
    <Route path={"/DeleteCard"} component={DeleteCard} />
    <Redirect to={"/"} />
  </Switch>
);
