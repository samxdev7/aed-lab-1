package uni.AEDLab1.models;

public record DepartamentoDto(int tam, String ubicacion, float extension, float precio,
    String numero, String inquilino) 
{
    public int getTam() {
        return tam;
    }
    
    public String ubicacion() {
        return ubicacion;
    }
    
    public float getExtension() {
        return extension;
    }
    
    public float getPrecio() {
        return precio;
    }
    
    public String getNumero() {
        return numero;
    }
    
    public String getInquilino() {
        return inquilino;
    }
}
