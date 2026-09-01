package uni.AEDLab1.models;

public class OrdenamientoDto {
    private int tam;
    private int[] elementos;
    private int metodoDeOrdenamiento;

    public OrdenamientoDto() {}

    public OrdenamientoDto(int tam, int[] elementos) {
        this.tam = tam;
        this.elementos = elementos;
    }

    public OrdenamientoDto(int tam, int[] arreglo, int metodoDeOrdenamiento) {
        this.tam = tam;
        this.elementos = arreglo;
        this.metodoDeOrdenamiento = metodoDeOrdenamiento;
    }

    public int getTam() {
        return tam;
    }

    public void setTam(int tam) {
        this.tam = tam;
    }

    public int[] getElementos() {
        return elementos;
    }

    public void setElementos(int[] elementos) {
        this.elementos = elementos;
    }

    public int getMetodoDeOrdenamiento() {
        return metodoDeOrdenamiento;
    }

    public void setMetodoDeOrdenamiento(int metodo) {
        this.metodoDeOrdenamiento = metodo;
    }

    // Compatibilidad con los servicios de develop
    public int tam() {
        return tam;
    }

    public int[] arreglo() {
        return elementos;
    }

    public int metodoDeOrdenamiento() {
        return metodoDeOrdenamiento;
    }
}
