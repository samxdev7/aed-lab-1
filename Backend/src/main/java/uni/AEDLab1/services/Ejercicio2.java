package uni.AEDLab1.services;

import uni.AEDLab1.models.ClienteDto;

/**
 * Servicio para el Ejercicio 2 - Registro de Clientes.
 * Implementa un arreglo desordenado mediante arreglos paralelos para almacenar
 * nombre, teléfono, saldo y estado de morosidad de cada cliente.
 */
public class Ejercicio2 {
    // Atributos de control del arreglo
    private final int tam; // Tamaño máximo físico del arreglo
    private int n; // Índice del último elemento ingresado (-1 si está vacío)
    
    // Arreglos paralelos para los atributos de los clientes
    private final String[] nombre;
    private final String[] telefono;
    private final float[] saldo;
    private final boolean[] moroso;
    
    /**
     * Constructor que inicializa los arreglos paralelos con el tamaño físico configurado.
     * @param tam Tamaño físico máximo.
     */
    public Ejercicio2(int tam) {
        this.n = -1;
        this.tam = tam;
        
        this.nombre = new String[tam];
        this.telefono = new String[tam];
        this.saldo = new float[tam];
        this.moroso = new boolean[tam];
    }
    
    public int getTam() {
        return this.tam;
    }

    /**
     * Agrega un nuevo cliente al final del arreglo desordenado.
     * @param cliente DTO con la información del cliente.
     * @return true si se agregó con éxito, false si el arreglo está lleno.
     */
    public boolean agregarCliente(ClienteDto cliente) {
        // Evita desbordamiento del límite físico del arreglo
        if (n >= tam - 1) {
            return false;
        }
        
        nombre[++n] = cliente.getNombre();
        telefono[n] = cliente.getTelefono();
        saldo[n] = cliente.getSaldo();
        moroso[n] = cliente.getMoroso();
        return true;
    }

    /**
     * Elimina un cliente por su nombre completo, compactando los elementos posteriores.
     * @param clienteNombre Nombre del cliente a eliminar.
     * @return true si se encontró y eliminó, false si no existía.
     */
    public boolean eliminarCliente(String clienteNombre) {
        int i = 0;

        // Búsqueda secuencial
        while (i <= n && !clienteNombre.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        // Si supera el límite lógico 'n', el cliente no existe
        if (i > n) { 
            return false;
        }
        
        // Desplazamiento a la izquierda para cubrir la vacante y mantener contigüidad
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            telefono[k] = telefono[k+1];
            saldo[k] = saldo[k+1];
            moroso[k] = moroso[k+1];
        }

        --n; // Decrementamos el límite lógico
        return true;
    }

    /**
     * Modifica el estado moroso de un cliente existente.
     * @param cliente DTO con el nombre y el nuevo estado moroso.
     * @return true si se actualizó, false si no se encontró el cliente.
     */
    public boolean modificarEstadoMoroso(ClienteDto cliente) {
        int i = 0;
        String objetivo = cliente.getNombre();

        // Búsqueda secuencial
        while (i <= n && !objetivo.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        if (i > n) {
            return false;
        }
        
        moroso[i] = cliente.getMoroso();
        return true;
    }

    /**
     * Busca y retorna los datos de un cliente determinado.
     * @param clienteNombre Nombre del cliente a consultar.
     * @return DTO del cliente, o null si no se encuentra.
     */
    public ClienteDto imprimirDatosDeUnCliente(String clienteNombre) {
        int i = 0;

        while (i <= n && !clienteNombre.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        if (i > n) {
            return null;
        }
        
        return new ClienteDto(tam, nombre[i], telefono[i], saldo[i], moroso[i]);
    }
    
    /**
     * Obtiene la lista completa de todos los clientes registrados.
     * @return Arreglo de DTOs con la longitud exacta de clientes registrados.
     */
    public ClienteDto[] imprimirTodosLosDatos() {
        ClienteDto[] listaClientes = new ClienteDto[n+1];

        for (int i = 0; i <= n; i++) {
            listaClientes[i] = new ClienteDto(tam, nombre[i], telefono[i], saldo[i], moroso[i]);
        }

        return listaClientes;
    }
}
