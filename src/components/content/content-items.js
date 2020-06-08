import Login from "../login/login";
import Logout from "../logout/logout";
import SignUp from "../signup/signup";
import StartPage from "../start-page/start-page";
import Settings from "../settings/settings";
import {AuthorizedProfilePage, ProfilePage} from "../profile/profile-containers";
import Feed from "../feed/feed";
import Messages from "../messages/messages";
import TodoList from "../todo-list/todo-list";
import InfoContainer from "../info/info-container";
import People from "../people/people";

// page: [Component, path]
const contentComponents = {
    rootPage: [StartPage, '/'],

    login: [Login, '/login'],
    logout: [Logout, '/logout'],
    signup: [SignUp, '/join'],

    me: [AuthorizedProfilePage, '/me'],
    profile: [ProfilePage, '/profile/:userId'],

    feed: [Feed, '/feed'],
    messages: [Messages, '/messages'],
    people: [People, '/people'],

    settings: [Settings, '/settings'],

    tasks: [TodoList, '/todo'],
    info: [InfoContainer, '/stats'],
}

export default contentComponents