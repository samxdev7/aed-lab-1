package uni.AEDLab1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.OrdenamientoDto;

@RestController
@RequestMapping("/api/ordenamiento")
@CrossOrigin(origins = "*")
public class SelectionSortController {

    @PostMapping("/seleccion")
    public ResponseEntity<?> selectionSort(@RequestBody OrdenamientoDto dto) {
        int[] arr = dto.getElementos();
        if (arr == null) {
            return ResponseEntity.badRequest().body("El arreglo no puede ser nulo.");
        }
        
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int min_idx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
            }
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
        return ResponseEntity.ok(arr);
    }
}
