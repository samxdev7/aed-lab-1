package uni.AEDLab1.services;

import uni.AEDLab1.models.ClienteDto;

/**
 * 2. Una empresa registra para cada uno de sus clientes los siguientes datos: Nombre,
 * Teléfono, Saldo, Moroso (verdadero o falso). Escriba un programa que pueda
 * proporcionar la siguiente información:
 *      1. Dar de alta a un cliente
 *      2. Modificar el estado moroso del cliente
 *      3. Dar de baja a un cliente.
 *      4. Listar la información completa de un cliente determinado
 *      5. Listar la información de todos los clientes.
 *      6. Salir
 */

public class Ejercicio2 {
    private final int tam;
    private int n;
    
    private final String[] nombre;
    private final String[] telefono;
    private final float[] saldo;
    private final boolean[] moroso;
    
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

    public void agregarCliente(ClienteDto cliente) {
        if (n >= tam - 1) {
            return;
        }
        
        nombre[++n] = cliente.getNombre();
        telefono[n] = cliente.getTelefono();
        saldo[n] = cliente.getSaldo();
        moroso[n] = cliente.getMoroso();
    }

    public void eliminarCliente(String clienteNombre) {
        int i = 0;

        while (i <= n && !clienteNombre.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) { 
            return;
        }
        
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            telefono[k] = telefono[k+1];
            saldo[k] = saldo[k+1];
            moroso[k] = moroso[k+1];
        }

        --n;
    }

    public void modificarEstadoMoroso(ClienteDto cliente) {
        int i = 0;
        String objetivo = cliente.getNombre();

        while (i <= n && !objetivo.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            return;
        }
        
        moroso[i] = cliente.getMoroso();
    }

    public ClienteDto imprimirDatosDeUnCliente(String clienteNombre) {
        int i = 0;

        while (i <= n && !clienteNombre.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            return null;
        }
        
        return new ClienteDto(tam, nombre[i], telefono[i], saldo[i], moroso[i]);
    }
    
    public ClienteDto[] imprimirTodosLosDatos() {
        ClienteDto[] listaClientes = new ClienteDto[tam];

        for (int i = 0; i <= n; i++) {
            listaClientes[i] = new ClienteDto(tam, nombre[i], telefono[i], saldo[i], moroso[i]);
        }

        return listaClientes;
    }
}
