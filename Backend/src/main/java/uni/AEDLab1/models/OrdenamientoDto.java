package uni.AEDLab1.models;

<<<<<<< HEAD
public class OrdenamientoDto {
    private int tam;
    private int[] elementos;

    public OrdenamientoDto() {}

    public OrdenamientoDto(int tam, int[] elementos) {
        this.tam = tam;
        this.elementos = elementos;
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
}
=======
public record OrdenamientoDto(int tam, int[] arreglo, int metodoDeOrdenamiento) {}
>>>>>>> origin/develop
