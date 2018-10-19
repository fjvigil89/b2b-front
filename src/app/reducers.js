import messages from "@common/messages/MessagesReducers";
import user from "@components/login/LoginReducers";
import salas from "@components/salas/salas_list//SalasListReducers";
import salasHeader from "@components/salas/salas_header/SalasHeaderReducers";
import salasInfo from "@components/salas_info/SalasInfoReducers";
import productos from "@components/salas_info/salas_info_detal_action/SalasInfoDetailActionReducers";
import productosCademsmart from "@components/salas_info/productos_cademsmart/ProductosCademsmartReducers";
import wall from "@components/wall/WallReducers";
import comments from "@components/wall/comments/CommentsReducers";
import publications from "@components/wall/publication/PublicationReducers";
import polls from "@components/polls/PollsReducers";
import pollsList from "@components/polls/polls_list/PollsListReducers";
import hashtags from "@components/wall/hashtags/HashtagsReducers";
import reporte from "@components/report/ReportReducers";

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  messages,
  user,
  salas,
  salasHeader,
  salasInfo,
  productos,
  productosCademsmart,
  wall,
  comments,
  publications,
  polls,
  hashtags,
  pollsList,
  reporte
};
