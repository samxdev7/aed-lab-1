package uni.AEDLab1.models;

public class BusquedaDto {
    private int tam;
    private int[] arreglo;
    private int objetivo;

    public BusquedaDto() {}

    public BusquedaDto(int tam, int[] arreglo, int objetivo) {
        this.tam = tam;
        this.arreglo = arreglo;
        this.objetivo = objetivo;
    }

    public int getTam() {
        return tam;
    }

    public void setTam(int tam) {
        this.tam = tam;
    }

    public int[] getArreglo() {
        return arreglo;
    }

    public void setArreglo(int[] arreglo) {
        this.arreglo = arreglo;
    }

    public int getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(int objetivo) {
        this.objetivo = objetivo;
    }
}