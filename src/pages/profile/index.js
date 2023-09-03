import Handlebars from "handlebars";
import emptyPhoto from "../../assets/empty.png";
export { default as ProfilePage } from "./profile.hbs?raw";

Handlebars.registerHelper("photo", () => emptyPhoto);
