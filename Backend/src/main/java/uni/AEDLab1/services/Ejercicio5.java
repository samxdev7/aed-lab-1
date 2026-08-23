package uni.AEDLab1.services;

import uni.AEDLab1.models.DepartamentoDto;

/**
 * 5. Una inmobiliaria necesita almacenar la siguiente información sobre los
 * departamentos rentados que se encuentran ordenados ascendentemente por la extensión
 * del departamento:
 * 
 * • Ubicación del departamento (dirección)
 * • Extensión del departamento (superficie en metros cuadrados de cada departamento)
 * • Precio
 * • Número de apartamento
 * • Nombre de la persona que rentó el departamento
 * 
 * Escriba un programa que pueda llevar a cabo las siguientes operaciones.
 * 1. Dar de alta a un departamento (Se renta y se pide la información)
 * 2. Dar de baja al departamento (Se libera el departamento)
 * 3. Modificar el precio de un departamento por medio de su número.
 * 4. Listar los datos de un departamento determinado.
 * 5. Listar los datos de todos los registros.
 * 6. Salir
 */

public class Ejercicio5 {
    private final int tam;
    private int n;
    
    private final String[] ubicacion;
    private final float[] extension;
    private final float[] precio;
    private final String[] numero;
    private final String[] inquilino;
    
    public Ejercicio5(int tam) {
        this.n = -1;
        this.tam = tam;
        
        this.ubicacion = new String[tam];
        this.extension = new float[tam];
        this.precio = new float[tam];
        this.numero = new String[tam];
        this.inquilino = new String[tam];
    }
    
    public int getTam() {
        return this.tam;
    }

    private int buscarPorNumero(String numeroDepto) {
        for (int i = 0; i <= n; i++) {
            if (numero[i].equalsIgnoreCase(numeroDepto)) {
                return i;
            }
        }
        return -1;
    }

    public void agregarDepartamento(DepartamentoDto depto) {
        if (n >= tam - 1) {
            return;
        }

        // Evitar duplicados por número de apartamento
        if (buscarPorNumero(depto.getNumero()) >= 0) {
            return;
        }

        // Buscar posición de inserción para mantener orden ascendente por extensión
        float ext = depto.getExtension();
        int insertPos = 0;
        while (insertPos <= n && extension[insertPos] < ext) {
            insertPos++;
        }

        n++;
        for (int i = n; i >= insertPos + 1; i--) {
            ubicacion[i] = ubicacion[i-1];
            extension[i] = extension[i-1];
            precio[i] = precio[i-1];
            numero[i] = numero[i-1];
            inquilino[i] = inquilino[i-1];
        }

        ubicacion[insertPos] = depto.ubicacion();
        extension[insertPos] = depto.getExtension();
        precio[insertPos] = depto.getPrecio();
        numero[insertPos] = depto.getNumero();
        inquilino[insertPos] = depto.getInquilino();
    }

    public void eliminarDepartamento(String numeroDepto) {
        int pos = buscarPorNumero(numeroDepto);
        if (pos < 0) {
            return; // No rentado
        }

        n--;
        for (int i = pos; i <= n; i++) {
            ubicacion[i] = ubicacion[i+1];
            extension[i] = extension[i+1];
            precio[i] = precio[i+1];
            numero[i] = numero[i+1];
            inquilino[i] = inquilino[i+1];
        }
    }

    public void modificarPrecio(DepartamentoDto depto) {
        int pos = buscarPorNumero(depto.getNumero());
        if (pos < 0) {
            return; // No encontrado
        }
        
        precio[pos] = depto.getPrecio();
    }

    public DepartamentoDto imprimirDatosDeUnDepartamento(String numeroDepto) {
        int pos = buscarPorNumero(numeroDepto);

        if (pos < 0) {
            return null;
        }

        return new DepartamentoDto(tam, ubicacion[pos], extension[pos], precio[pos], numero[pos], inquilino[pos]);
    }

    public DepartamentoDto[] imprimirTodosLosDatos() {
        DepartamentoDto[] lista = new DepartamentoDto[tam];
        
        for (int i = 0; i <= n; i++) {
            lista[i] = new DepartamentoDto(tam, ubicacion[i], extension[i], precio[i], numero[i], inquilino[i]);
        }

        return lista;
    }
}
