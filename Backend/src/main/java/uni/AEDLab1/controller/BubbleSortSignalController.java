package uni.AEDLab1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.OrdenamientoDto;

@RestController
@RequestMapping("/api/ordenamiento")
public class BubbleSortSignalController {

    @PostMapping("/burbuja-senal")
    public ResponseEntity<?> bubbleSortSignal(@RequestBody OrdenamientoDto dto) {
        int[] arr = dto.getElementos();
        if (arr == null) {
            return ResponseEntity.badRequest().body("El arreglo no puede ser nulo.");
        }
        
        int n = arr.length;
        boolean band = false;
        int i = 0;
        
        while (i < n - 1 && !band) {
            band = true;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    band = false;
                }
            }
            i++;
        }
        return ResponseEntity.ok(arr);
    }
}
