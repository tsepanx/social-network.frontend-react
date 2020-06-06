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

// const authedProfileItem = {component: , title: 'Profile'}
// const profileItem = {component: ProfilePage, path: }
// const feedItem = {component: Feed, path: '/feed', title: 'News'}
// const messagesItem = {component: Messages, path: '/messages', title: 'Messages'}
//
// const todoListItem = {component: TodoList, path: '/todo', title: 'TODO'}
// const info = {component: InfoContainer, path: '/stats', title: 'Statistics'}

const contentComponents = {
    rootPage: [StartPage, '/'],

    login: [Login, '/login'],
    logout: [Logout, '/logout'],
    signup: [SignUp, '/join'],

    me: [AuthorizedProfilePage, '/me'],
    profile: [ProfilePage, '/profile/:userId'],

    feed: [Feed, '/feed'],
    messages: [Messages, '/messages'],
    settings: [Settings, '/settings'],

    tasks: [TodoList, '/todo'],
    info: [InfoContainer, '/stats'],
}

export default contentComponents