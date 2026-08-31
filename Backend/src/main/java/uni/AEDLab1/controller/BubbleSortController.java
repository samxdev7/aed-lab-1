package uni.AEDLab1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.OrdenamientoDto;

@RestController
@RequestMapping("/api/metodos")
@CrossOrigin(origins = "*")
public class BubbleSortController {

    @PostMapping("/burbuja")
    public ResponseEntity<?> bubbleSort(@RequestBody OrdenamientoDto dto) {
        int[] arr = dto.getElementos();
        if (arr == null) {
            return ResponseEntity.badRequest().body("El arreglo no puede ser nulo.");
        }
        
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return ResponseEntity.ok(arr);
    }
}
