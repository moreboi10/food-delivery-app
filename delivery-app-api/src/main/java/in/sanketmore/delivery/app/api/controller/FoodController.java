package in.sanketmore.delivery.app.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.sanketmore.delivery.app.api.io.FoodRequest;
import in.sanketmore.delivery.app.api.io.FoodResponse;
import in.sanketmore.delivery.app.api.service.FoodService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {


    private final FoodService foodService;

    @PostMapping
    public ResponseEntity<FoodResponse> addFood(@RequestPart("food") String foodString,@RequestPart("file") MultipartFile file){

        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        }
        catch (JsonProcessingException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON Format ", ex);
        }
        FoodResponse  response = foodService.addFood(request,file);
        return new  ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public List<FoodResponse> readFoods(){
        try{
            return foodService.readFoods();
        }
        catch (ResponseStatusException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON Format ", ex);
        }
    }

    @GetMapping("/{id}")
    public FoodResponse readFood(@PathVariable("id") String id){
        return foodService.readFood(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id){
        foodService.deleteFood(id);
    }

}
