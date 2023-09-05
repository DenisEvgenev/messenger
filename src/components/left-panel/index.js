import Handlebars from "handlebars";
import "./left-panel.scss";
import LeftArrowIcon from "../../assets/arrow-left.svg";
export { default as LeftPanel } from "./left-panel.hbs?raw";

Handlebars.registerHelper("left-arrow", () => LeftArrowIcon);
