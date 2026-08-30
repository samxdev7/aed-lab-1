package uni.AEDLab1.services;

import uni.AEDLab1.models.AlgoritmosDto;

public class Ordenamiento {
    
    public class Burbuja extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) {
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            // Algoritmo de burbuja
            for (int i = 1; i <= tam; i++) {
                for (int j = 0; j < tam; j++) {
                    if (elementos[j] > elementos[j + 1]) {
                        int temp = elementos[j + 1];
                        elementos[j + 1] = elementos[j];
                        elementos[j] = temp;
                    }
                }
            }
            
            return elementos;
        }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class BurbujaSenal extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) { 
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Burbuja Señal
            int i = 1;
            boolean band = false;
            while((i < tam)&&(band == false)){
                band = true;
                for (int j = 0; j < tam; j++){
                    if(elementos[j] > elementos[j+1]){
                        int temp = elementos[j + 1];
                        elementos[j + 1] = elementos[j];
                        elementos[j] = temp;
                        band = false;
                    }
                }
                i++;
            }
            return elementos;
        }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Baraja extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) {
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Baraja
            for(int i = 1; i <= tam; i++){
                int aux = elementos[i];
                int k = i - 1;
                while((k >= 0) && (aux < elementos[k])){
                    elementos[k + 1] = elementos[k];
                    k--;
                }
                elementos[k + 1]=aux;
            }
        }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Sacudida extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) {
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Sacudida
            int Izq = 1, Der = tam - 1 , k = tam - 1;
            while(Der > Izq){
                for(int i = Der; i <= Izq; i--){
                    if(elementos[i - 1] > elementos[i]){
                        int temp = elementos[i-1];
                        elementos[i-1] = elementos[i];
                        elementos[i] = temp;
                        k = i;
                    }
                }
                Izq = k + 1;
                
                for(int i = Izq; i <= Der; i++){
                    if(elementos[i - 1] > elementos[i]){
                        int temp = elementos[i-1];
                        elementos[i-1] = elementos[i];
                        elementos[i] = temp;
                        k = i;
                    }
                }
                Der = k + 1;
            }
        }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Seleccion extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) {
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Selección
            for(int i = 0; i < tam; i++){
                int menor = elementos[i];
                int k = i;
                for(int j = i + 1; j < tam; j++){
                    if(elementos[j] < menor){
                        menor = elementos[j];
                        k = j;
                    }
                }
                elementos[k] = elementos[i];
                elementos[i] = menor;
            }
        }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Shell extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) { 
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Shell
            int Ent = tam + 1;
            while(Ent>0){
                Ent = (int) (Ent / 2);
                boolean Band = true;
                while(Band = true){
                    Band = false;
                    int i = 0;
                    while ((i + Ent) < tam){
                        if(elementos[i] > elementos[i + Ent]){
                            int temp = elementos[i];
                            elementos[i] = elementos[i + Ent];
                            elementos[i + Ent] = temp;
                            Band = true;
                        }
                        i++;
                    }
                }
            }
        }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
}
