package uni.AEDLab1.services;

import uni.AEDLab1.models.AlgoritmosDto;

public abstract class Algoritmo {
    public abstract int[] ordenar(AlgoritmosDto entradas);
    public abstract int[] buscarElemento(AlgoritmosDto entradas);
}
