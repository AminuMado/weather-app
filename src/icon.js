import _01dSrc from "./assets/img/icons/01d.svg";
import _01nSrc from "./assets/img/icons/01n.svg";
import _02dSrc from "./assets/img/icons/02d.svg";
import _02nSrc from "./assets/img/icons/02n.svg";
import _03dSrc from "./assets/img/icons/03d.svg";
import _03nSrc from "./assets/img/icons/03n.svg";
import _04dSrc from "./assets/img/icons/04d.svg";
import _04nSrc from "./assets/img/icons/04n.svg";
import _09dSrc from "./assets/img/icons/09d.svg";
import _09nSrc from "./assets/img/icons/09n.svg";
import _10dSrc from "./assets/img/icons/10d.svg";
import _10nSrc from "./assets/img/icons/10n.svg";
import _11dSrc from "./assets/img/icons/11d.svg";
import _11nSrc from "./assets/img/icons/11n.svg";
import _13dSrc from "./assets/img/icons/13d.svg";
import _13nSrc from "./assets/img/icons/13n.svg";
import _50dSrc from "./assets/img/icons/50d.svg";
import _50nSrc from "./assets/img/icons/50n.svg";

function getIcon(code) {
  switch (code) {
    case "01d":
      return _01dSrc;
      break;
    case "01n":
      return _01nSrc;
      break;
    case "02d":
      return _02dSrc;
      break;
    case "02n":
      return _02nSrc;
      break;
    case "03d":
      return _03dSrc;
      break;
    case "03n":
      return _03nSrc;
      break;
    case "04d":
      return _04dSrc;
      break;
    case "04n":
      return _04nSrc;
      break;
    case "09d":
      return _09dSrc;
      break;
    case "09n":
      return _09nSrc;
      break;
    case "10d":
      return _10dSrc;
      break;
    case "10n":
      return _10nSrc;
      break;
    case "11d":
      return _11dSrc;
      break;
    case "11n":
      return _11nSrc;
      break;
    case "13d":
      return _13dSrc;
      break;
    case "13n":
      return _13nSrc;
      break;
    default:
      return;
  }
}
export { getIcon };
