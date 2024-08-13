import http from "../http-commons"
import axios from 'axios';
import { NewDto, News } from "../types/New"
import axiosInstance from "../axiosInstance";

class EventService
{

    

    getAllNewsDetail()
    {
        
        return axiosInstance.get<News[]>("/news/get-all-detail-news");
    }

    getAllNew()
    {
        return axiosInstance.get("/news/get-all-news");
    }
    getNewById(id:number)
    {
        return axiosInstance.get("/news/get-news-by-id/"+id);
    }
    deleteNew(id:number)
    {
        return axiosInstance.delete("/news/delete/"+id);
    }
    updateNew(id: number, updatedNews: NewDto) {
        {
            return axiosInstance.put(`/news/update-news/${id}`, updatedNews);
        }
    }
    addNew(entityNews :NewDto) {
        {
            return axiosInstance.post(`/news/add-news`, entityNews);
        }
    }
}

export default new EventService();