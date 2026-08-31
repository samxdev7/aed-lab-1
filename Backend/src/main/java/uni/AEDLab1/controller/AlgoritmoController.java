package uni.AEDLab1.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.BusquedaDto;

@RestController
@RequestMapping("/api/algoritmo")
@CrossOrigin(origins = "*") // Permite la conexión desde React
public class AlgoritmoController {

    @PostMapping("/busqueda")
    public ResponseEntity<?> busquedaBinaria(@RequestBody BusquedaDto dto) {
        int[] arr = dto.getArreglo();
        int objetivo = dto.getObjetivo();

        if (arr == null || arr.length == 0) {
            return ResponseEntity.badRequest().body("El arreglo no puede estar vacío.");
        }

        int inicio = 0;
        int fin = arr.length - 1;
        int posicion = -1;

        // Algoritmo de Búsqueda Binaria
        while (inicio <= fin) {
            int medio = inicio + (fin - inicio) / 2;

            if (arr[medio] == objetivo) {
                posicion = medio;
                break;
            }

            if (arr[medio] < objetivo) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }

        return ResponseEntity.ok(posicion);
    }
}