import {useQuery} from "react-query";

import axios from "axios";

const fetchPopularArticle = () => {
    return axios.get("https://dev-server.cmi.kro.kr/articles/popular");
};

export const usePopularArticle = () => {
    const response = useQuery<any, void>("schedules", fetchPopularArticle);
    return response;
};
