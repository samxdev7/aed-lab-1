package uni.AEDLab1.services;

import uni.AEDLab1.models.VendedorDto;

/**
 * 6. Una compañía quiere almacenar en arreglos ordenados la siguiente información para
 * cada vendedor: nombre y total de ventas. Inicialmente los arreglos están vacíos. Utilizar los
 * algoritmos estudiados.
 * 
 * Escribir un programa que permita realizar lo siguiente:
 *      1. Dar de alta a un vendedor
 *      2. Modificar el total de ventas de un vendedor determinado.
 *      3. Imprimir el registro de un vendedor determinado.
 *      4. Salir
 * Los arreglos deberán estar ordenados por el nombre del vendedor.
 */

public class Ejercicio6 {
    private final int tam;
    private int n;
    
    private final String[] nombre;
    private final float[] totalVentas;
    
    public Ejercicio6(int tam) {
        this.n = -1;
        this.tam = tam;
        
        this.nombre = new String[tam];
        this.totalVentas = new float[tam];
    }
    
    public int getTam() {
        return this.tam;
    }

    private int buscarVendedor(String vendedorNombre) {
        int i = 0;
        while (i <= n && nombre[i].compareToIgnoreCase(vendedorNombre) < 0) {
            i++;
        }
        if (i <= n && nombre[i].equalsIgnoreCase(vendedorNombre)) {
            return i; // Encontrado
        }
        return -(i + 1); // No encontrado, posición de inserción es i
    }

    public void agregarVendedor(VendedorDto vendedor) {
        if (n >= tam - 1) {
            return;
        }

        String vendedorNombre = vendedor.getNombre();
        int pos = buscarVendedor(vendedorNombre);

        if (pos >= 0) {
            // Ya registrado
            return;
        }

        int insertPos = -pos - 1;
        n++;

        for (int i = n; i >= insertPos + 1; i--) {
            nombre[i] = nombre[i-1];
            totalVentas[i] = totalVentas[i-1];
        }

        nombre[insertPos] = vendedorNombre;
        totalVentas[insertPos] = vendedor.getTotalVentas();
    }

    public void modificarVentas(VendedorDto vendedor) {
        int pos = buscarVendedor(vendedor.getNombre());
        if (pos < 0) {
            return; // No existe
        }
        
        totalVentas[pos] = vendedor.getTotalVentas();
    }

    public VendedorDto imprimirDatosDeUnVendedor(String vendedorNombre) {
        int pos = buscarVendedor(vendedorNombre);

        if (pos < 0) {
            return null;
        }

        return new VendedorDto(tam, nombre[pos], totalVentas[pos]);
    }

    public VendedorDto[] imprimirTodosLosDatos() {
        VendedorDto[] lista = new VendedorDto[n+1];
        
        for (int i = 0; i <= n; i++) {
            lista[i] = new VendedorDto(tam, nombre[i], totalVentas[i]);
        }

        return lista;
    }
}
