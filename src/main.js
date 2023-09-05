import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import emptyPhoto from "./assets/empty.png";

const pages = {
  login: [Pages.LoginPage],
  "sign-in": [Pages.SignInPage],
  chat: [Pages.ChatPage],
  404: [Pages.ClientErrorPage],
  500: [Pages.ServerErrorPage],
  profile: [Pages.ProfilePage, { photo: emptyPhoto }],
  "profile-edit": [Pages.ProfileEditPage, { photo: emptyPhoto }],
  "profile-password": [Pages.ProfilePasswordPage, { photo: emptyPhoto }],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
  const [source, context] = pages[page];
  const container = document.getElementById("app");
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("click", (e) => {
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
