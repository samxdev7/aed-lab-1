package uni.AEDLab1.models;

public record EmpleadoDesordenadoDto(int tam, String nombre, boolean esMujer, int edad)
{
    public int getTam() {
        return tam;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public int getEdad() {
        return edad;
    }
    
    public boolean getSexo() {
        return esMujer;
    }
}
