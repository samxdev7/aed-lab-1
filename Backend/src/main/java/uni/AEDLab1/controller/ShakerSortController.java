package uni.AEDLab1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.OrdenamientoDto;

@RestController
@RequestMapping("/api/ordenamiento")
public class ShakerSortController {

    @PostMapping("/sacudida")
    public ResponseEntity<?> shakerSort(@RequestBody OrdenamientoDto dto) {
        int[] arr = dto.getElementos();
        if (arr == null) {
            return ResponseEntity.badRequest().body("El arreglo no puede ser nulo.");
        }
        
        boolean swapped = true;
        int start = 0;
        int end = arr.length;

        while (swapped) {
            swapped = false;
            for (int i = start; i < end - 1; ++i) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }

            if (!swapped) {
                break;
            }

            swapped = false;
            end = end - 1;

            for (int i = end - 1; i >= start; i--) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            start = start + 1;
        }
        
        return ResponseEntity.ok(arr);
    }
}
