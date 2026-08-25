package uni.AEDLab1.services;

import uni.AEDLab1.models.DepartamentoDto;

/**
 * Servicio para el Ejercicio 5 - Renta de Departamentos.
 * Mantiene los departamentos ordenados de forma ascendente por su extensión (superficie en m²).
 * Asegura números de departamento únicos y permite el registro, liberación, modificación de precios,
 * y consultas de información.
 */
public class Ejercicio5 {
    // Atributos de control del arreglo
    private final int tam; // Tamaño físico máximo del arreglo
    private int n; // Índice del último elemento registrado (-1 si está vacío)
    
    // Arreglos paralelos para los atributos de los departamentos
    private final String[] ubicacion;
    private final float[] extension;
    private final float[] precio;
    private final String[] numero;
    private final String[] inquilino;
    
    /**
     * Constructor que inicializa los arreglos paralelos con el tamaño configurado.
     * @param tam Tamaño físico máximo.
     */
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

    /**
     * Busca secuencialmente un departamento por su número único.
     * @param numeroDepto Número de departamento a consultar.
     * @return El índice si se encuentra, o -1 si no.
     */
    private int buscarPorNumero(String numeroDepto) {
        for (int i = 0; i <= n; i++) {
            if (numero[i].equalsIgnoreCase(numeroDepto)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Registra/renta un departamento colocándolo ordenado por extensión (superficie).
     * @param depto DTO con los datos del departamento.
     * @return true si se agregó con éxito, false si el arreglo está lleno o si el número ya existe.
     */
    public boolean agregarDepartamento(DepartamentoDto depto) {
        // Validar límite físico de almacenamiento
        if (n >= tam - 1) {
            return false;
        }

        // Evitar duplicados por número de apartamento (identificador único)
        if (buscarPorNumero(depto.getNumero()) >= 0) {
            return false;
        }

        // Buscar posición de inserción para mantener orden ascendente por extensión
        float ext = depto.getExtension();
        int insertPos = 0;
        while (insertPos <= n && extension[insertPos] < ext) {
            insertPos++;
        }

        n++; // Incrementamos el límite lógico
        
        // Desplazamiento a la derecha de los elementos para abrir el espacio
        for (int i = n; i >= insertPos + 1; i--) {
            ubicacion[i] = ubicacion[i-1];
            extension[i] = extension[i-1];
            precio[i] = precio[i-1];
            numero[i] = numero[i-1];
            inquilino[i] = inquilino[i-1];
        }

        // Guardamos en la posición ordenada
        ubicacion[insertPos] = depto.ubicacion();
        extension[insertPos] = depto.getExtension();
        precio[insertPos] = depto.getPrecio();
        numero[insertPos] = depto.getNumero();
        inquilino[insertPos] = depto.getInquilino();
        return true;
    }

    /**
     * Elimina/libera un departamento por su número, compactando el arreglo.
     * @param numeroDepto Número del departamento a liberar.
     * @return true si se liberó con éxito, false si no estaba registrado.
     */
    public boolean eliminarDepartamento(String numeroDepto) {
        int pos = buscarPorNumero(numeroDepto);
        if (pos < 0) {
            return false; // No rentado / no existe
        }

        n--;
        // Desplazamiento a la izquierda para cubrir la vacante y mantener el arreglo compacto y ordenado
        for (int i = pos; i <= n; i++) {
            ubicacion[i] = ubicacion[i+1];
            extension[i] = extension[i+1];
            precio[i] = precio[i+1];
            numero[i] = numero[i+1];
            inquilino[i] = inquilino[i+1];
        }
        return true;
    }

    /**
     * Modifica el precio de un departamento rentado.
     * @param depto DTO con el número y el nuevo precio.
     * @return true si se actualizó con éxito, false si no se encontró.
     */
    public boolean modificarPrecio(DepartamentoDto depto) {
        int pos = buscarPorNumero(depto.getNumero());
        if (pos < 0) {
            return false; // No encontrado
        }
        
        precio[pos] = depto.getPrecio();
        return true;
    }

    /**
     * Busca y retorna los datos de un departamento determinado por su número.
     * @param numeroDepto Número de departamento a consultar.
     * @return DTO del departamento, o null si no se encuentra.
     */
    public DepartamentoDto imprimirDatosDeUnDepartamento(String numeroDepto) {
        int pos = buscarPorNumero(numeroDepto);

        if (pos < 0) {
            return null;
        }

        return new DepartamentoDto(tam, ubicacion[pos], extension[pos], precio[pos], 
            numero[pos], inquilino[pos]);
    }

    /**
     * Obtiene el listado completo de todos los departamentos en orden ascendente por extensión.
     * @return Arreglo de DTOs con tamaño lógico exacto.
     */
    public DepartamentoDto[] imprimirTodosLosDatos() {
        DepartamentoDto[] lista = new DepartamentoDto[n+1];
        
        for (int i = 0; i <= n; i++) {
            lista[i] = new DepartamentoDto(tam, ubicacion[i], extension[i], precio[i], 
                numero[i], inquilino[i]);
        }

        return lista;
    }
}
