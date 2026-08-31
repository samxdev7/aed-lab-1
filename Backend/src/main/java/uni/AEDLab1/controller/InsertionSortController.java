package uni.AEDLab1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.OrdenamientoDto;

@RestController
@RequestMapping("/api/ordenamiento")
@CrossOrigin(origins = "*")
public class InsertionSortController {

    @PostMapping("/insercion")
    public ResponseEntity<?> insertionSort(@RequestBody OrdenamientoDto dto) {
        int[] arr = dto.getElementos();
        if (arr == null) {
            return ResponseEntity.badRequest().body("El arreglo no puede ser nulo.");
        }
        
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
        return ResponseEntity.ok(arr);
    }
}
