package in.bushandsir.foodiesapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.bushandsir.foodiesapi.io.FoodRequest;
import in.bushandsir.foodiesapi.io.FoodResponse;
import in.bushandsir.foodiesapi.service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import java.util.List;
@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {

    private final FoodService foodService;

    @PostMapping( consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
      public FoodResponse addFood(@RequestPart("food")String foodString,
                                  @RequestPart("file")MultipartFile file) {
        // validador rápido
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Arquivo não enviado");
        }
        // opcional: log para confirmar
        System.out.println(">>> Arquivo recebido: " + file.getOriginalFilename());

        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try{
          request =  objectMapper.readValue(foodString, FoodRequest.class);
        }catch(JsonProcessingException ex){
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format");
        }
       FoodResponse response = foodService.addFood(request, file);
        return response;

      }
      @GetMapping
      public List<FoodResponse> readFoods(){
        return foodService.readFoods();
      }

      @GetMapping("/{id}")
      public FoodResponse readFood(@PathVariable String id){
        return foodService.readFood(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id) {
           foodService.deleteFood(id);

    }


}
