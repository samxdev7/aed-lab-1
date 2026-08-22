package uni.AEDLab1.models;

public record ClienteDto(int tam, String nombre, String telefono, float saldo, boolean moroso) 
{
    public int getTam() {
        return tam;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public String getTelefono() {
        return telefono;
    }
    
    public float getSaldo() {
        return saldo;
    }
    
    public boolean getMoroso() {
        return moroso;
    }
}
