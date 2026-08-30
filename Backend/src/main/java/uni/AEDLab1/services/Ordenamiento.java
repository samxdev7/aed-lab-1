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
        public int buscarElemento(AlgoritmosDto entradas) { return -1; }
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
        public int buscarElemento(AlgoritmosDto entradas) { return -1; }
    }
    
    public class Baraja extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) {
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            // Algoritmo Baraja / InsertSort
            for (int i = 1; i <= tam; i++) {
                int aux = elementos[i];
                int k = i - 1;
                while((k >= 0) && (aux < elementos[k])){
                    elementos[k + 1] = elementos[k];
                    k--;
                }
                elementos[k + 1] = aux;
            }
            
            return elementos;
        }

        @Override
        public int buscarElemento(AlgoritmosDto entradas) { return -1; }
    }
    
    public class Sacudida extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) {
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Sacudida
            int izq = 1, der = tam - 1 , k = tam - 1;
            while (der > izq){
                for (int i = der; i <= izq; i--) {
                    if (elementos[i - 1] > elementos[i]) {
                        int temp = elementos[i-1];
                        elementos[i-1] = elementos[i];
                        elementos[i] = temp;
                        k = i;
                    }
                }
                izq = k + 1;
                
                for (int i = izq; i <= der; i++) {
                    if (elementos[i - 1] > elementos[i]) {
                        int temp = elementos[i-1];
                        elementos[i-1] = elementos[i];
                        elementos[i] = temp;
                        k = i;
                    }
                }
                der = k + 1;
            }
            
            return elementos;
        }

        @Override
        public int buscarElemento(AlgoritmosDto entradas) { return -1; }
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
                for (int j = i + 1; j < tam; j++) {
                    if (elementos[j] < menor) {
                        menor = elementos[j];
                        k = j;
                    }
                }
                elementos[k] = elementos[i];
                elementos[i] = menor;
            }
            
            return elementos;
        }

        @Override
        public int buscarElemento(AlgoritmosDto entradas) { return -1; }
    }
    
    public class Shell extends Algoritmo {
        @Override
        public int[] ordenar(AlgoritmosDto entradas) { 
            int tam = entradas.tam();
            int[] elementos = entradas.elementos();
            
            //Algoritmo Shell
            int ent = tam + 1;
            while (ent > 0) {
                ent = (int) (ent / 2);
                boolean band = true;
                while (band == true) {
                    band = false;
                    int i = 0;
                    while ((i + ent) < tam) {
                        if (elementos[i] > elementos[i + ent]) {
                            int temp = elementos[i];
                            elementos[i] = elementos[i + ent];
                            elementos[i + ent] = temp;
                            band = true;
                        }
                        i++;
                    }
                }
            }
            
            return elementos;
        }

        @Override
        public int buscarElemento(AlgoritmosDto entradas) { return -1; }
    }
    
    public int[] ejecutar(AlgoritmosDto entradas) {
        int[] arregloOrdenado;
        Algoritmo algoritmoOrdenacion;
        
        switch (entradas.opcion()) {
            case 1 -> algoritmoOrdenacion = new Burbuja();
            case 2 -> algoritmoOrdenacion = new BurbujaSenal();
            case 3 -> algoritmoOrdenacion = new Baraja();
            case 4 -> algoritmoOrdenacion = new Sacudida();
            case 5 -> algoritmoOrdenacion = new Seleccion();
            case 6 -> algoritmoOrdenacion = new Shell();
            default -> algoritmoOrdenacion = null;
        }
        
        arregloOrdenado = algoritmoOrdenacion.ordenar(entradas);
        return arregloOrdenado;
    }
}
