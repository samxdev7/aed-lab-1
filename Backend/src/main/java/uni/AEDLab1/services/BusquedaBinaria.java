package uni.AEDLab1.services;

import uni.AEDLab1.models.AlgoritmosDto;

public class BusquedaBinaria extends Algoritmo {
    
    @Override
    public int[] ordenar(AlgoritmosDto entradas) { return null; }

    @Override
    public int buscarElemento(AlgoritmosDto entradas) {
        int tam = entradas.tam();
        int[] elementos = entradas.elementos();
        int x = entradas.buscar();
        
        //Algoritmo de busqueda binaria
        int inicio = 0, fin = tam - 1, centro = 0;
        boolean band = false;
        while ((inicio <= fin) && (band == false)) {
            centro = (int) (inicio + fin) / 2;
            
            if (x == elementos[centro]) band = true;
            else if (x < elementos[centro]) fin--;
            else inicio++;   
        }
    
        if (band == true) return centro;
        else return -1;
    }
}
