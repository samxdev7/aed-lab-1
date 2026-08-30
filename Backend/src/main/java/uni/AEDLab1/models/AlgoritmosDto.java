package uni.AEDLab1.models;

public record AlgoritmosDto(int tam, int[] elementos, int buscar)
{
    public int getTam() {
        return tam;
    }
    
    public int[] getElementos() {
        return elementos;
    }
    
    public int getBuscar() {
        return buscar;
    }
}
