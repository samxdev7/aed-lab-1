package uni.AEDLab1.models;

public record VendedorDto(int tam, String nombre, float totalVentas) 
{
    public int getTam() {
        return tam;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public float getTotalVentas() {
        return totalVentas;
    }
}
