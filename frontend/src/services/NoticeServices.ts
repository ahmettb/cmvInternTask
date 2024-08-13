import axiosInstance from "../axiosInstance";
import http from "../http-commons";
import { NoticeRequestDto ,Notice} from "../types/Notice";

class NoticeService {
  addNotice(notice: NoticeRequestDto, file: File) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(notice));
    formData.append("file", file);
    return axiosInstance.post("/notice/add-notice", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });  
  
  }
  getNoticesAllDetail()
  {

    return axiosInstance.get<Notice[]>("/notice/get-all-detail");
  }
  getAll()
  {

    return axiosInstance.get<Notice[]>("/notice/get-all");
  }
  getImage(id: number) {
    return axiosInstance.get(`/notice/get-image/${id}`, { responseType: 'blob' });
  }
  deleteNotice(id: number) {
    return axiosInstance.delete(`/notice/delete-notice/${id}`);
  }
  

  updateNotice(id:number,notice: NoticeRequestDto, file: File) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(notice));
    formData.append("imageFile", file);

    return axiosInstance.put("/notice/update-notice/"+id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });  
  
  }

  getNoticeById(id: number) {
    return axiosInstance.get(`/notice/get-notice-by-id/${id}`);
  }
}

export default new NoticeService();
