import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/article");
  }

  get(id) {
    return http.get(`/article/${id}`);
  }

  create(data) {
    return http.post("/article", data);
  }

  update(id, data) {
    return http.put(`/article/${id}`, data);
  }

  delete(id) {
    return http.delete(`/article/${id}`);
  }

}

export default new TutorialDataService();
