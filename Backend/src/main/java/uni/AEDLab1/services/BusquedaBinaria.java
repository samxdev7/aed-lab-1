package uni.AEDLab1.services;

import uni.AEDLab1.models.AlgoritmosDto;
import javax.swing.JOptionPane;

public class BusquedaBinaria extends Algoritmo {
    
    @Override
    public int[] ordenar(AlgoritmosDto entradas) { return null; }

    @Override
    public int[] buscarElemento(AlgoritmosDto entradas) { 
        int tam = entradas.tam();
        int[] elementos = entradas.elementos();
        int x = entradas.buscar();
        
        //Algoritmo de busqueda binaria
        int inicio = 0, fin = tam - 1;
        boolean Band = false;
        while((inicio <= fin) && (Band == false)){
            int centro = (int) (inicio + fin)/2;
            if(x == elementos[centro]){
                Band = true;
            }else if (x < elementos[centro]){
                    fin--;
                } else{
                   inicio++; 
                }   
            }
    
        if(Band == true){
            JOptionPane.showMessageDialog(null, x +" se encuentra en la posición " + centro);
        }else {
            JOptionPane.showMessageDialog(null, x +" no se encuentra en el arreglo.");

        }
    }
}
