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
        public int[] ordenar(AlgoritmosDto entradas) { return null; }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Baraja extends Algoritmo {

        @Override
        public int[] ordenar(AlgoritmosDto entradas) { return null; }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Sacudida extends Algoritmo {

        @Override
        public int[] ordenar(AlgoritmosDto entradas) { return null; }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Seleccion extends Algoritmo {

        @Override
        public int[] ordenar(AlgoritmosDto entradas) { return null; }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
    
    public class Shell extends Algoritmo {

        @Override
        public int[] ordenar(AlgoritmosDto entradas) { return null; }

        @Override
        public int[] buscarElemento(AlgoritmosDto entradas) { return null; }
    }
}
