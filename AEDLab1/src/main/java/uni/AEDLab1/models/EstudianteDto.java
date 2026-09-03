package uni.AEDLab1.models;

public record EstudianteDto(int tam, String nombre, int nSemestresCursados, float promedioTotal) 
{
    public int getTam() {
        return tam;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public int getNSemestresCursados() {
        return nSemestresCursados;
    }
    
    public float getPromedioTotal() {
        return promedioTotal;
    }
}
