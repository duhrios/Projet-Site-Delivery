package in.bushandsir.foodiesapi.service;

import in.bushandsir.foodiesapi.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;
import in.bushandsir.foodiesapi.io.FoodRequest;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);

   FoodResponse addFood(FoodRequest request, MultipartFile file);

   List<FoodResponse> readFoods();

   FoodResponse readFood(String id);

   boolean deleteFile(String filename);

   void deleteFood(String id);
}





