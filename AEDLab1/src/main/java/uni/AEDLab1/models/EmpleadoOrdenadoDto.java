package uni.AEDLab1.models;

public record EmpleadoOrdenadoDto(int tam, String nombre, String direccion, int edad, 
    boolean esMujer, int añosDeAntiguedad) 
{
    public int getTam() {
        return tam;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public String getDireccion() {
        return direccion;
    }
    
    public int getEdad() {
        return edad;
    }
    
    public boolean getSexo() {
        return esMujer;
    }
    
    public int getAñosDeAntiguedad() {
        return añosDeAntiguedad;
    }
}
