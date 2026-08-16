package uni.AEDLab1.ArreglosDesordenados;

import javax.swing.*;

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
    static int tam;
    static int n;
    
    static String[] nombre;
    static String[] telefono;
    static float[] salario;
    static boolean[] moroso;
    
    public static void main(String[] args) {
        tam = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el tamaño del arreglo"));
        n = -1;
        
        nombre = new String[tam];
        telefono = new String[tam];
        salario = new float[tam];
        moroso = new boolean[tam];
        
        int opt;
        do {
            opt = Integer.parseInt(JOptionPane.showInputDialog("""
                Menu de Opciones:
                1. Dar de alta a un cliente
                2. Modificar el estado moroso del cliente
                3. Dar de baja a un cliente.
                4. Listar la información completa de un cliente determinado
                5. Listar la información de todos los clientes.
                6. Salir"""));

            switch (opt) {
                case 1 -> n = agregarCliente();
                case 2 -> modificarEstadoMoroso();
                case 3 -> n = eliminarCliente();
                case 4 -> imprimirDatosDeUnCliente();
                case 5 -> imprimirTodosLosDatos();
                case 6 -> {}
                default -> JOptionPane.showMessageDialog(null, "Opción invalida");
            }
        } while (opt != 6);

        System.exit(0);
    }

    public static int agregarCliente() {
        if (n >= tam - 1) {
            JOptionPane.showMessageDialog(null, "No hay espacio");
            return n;
        }
        
        nombre[++n] = JOptionPane.showInputDialog("Ingrese el nombre del cliente");
        telefono[n] = JOptionPane.showInputDialog("Ingrese el numero de telefono");
        salario[n] = Float.parseFloat(
            JOptionPane.showInputDialog("Ingrese el salario actual"));
        moroso[n] = JOptionPane.showConfirmDialog(null, "¿El cliente tiene el estado moroso?", 
            "", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION;

        return n;
    }

    public static int eliminarCliente() {
        int i = 0;
        String cliente = JOptionPane.showInputDialog(
            "Ingrese el nombre del cliente a eliminar");

        while (i <= n && !cliente.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) { 
            JOptionPane.showMessageDialog(null, "No se encuentra un cliente llamado " + cliente); 
            return n;
        }
        
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            telefono[k] = telefono[k+1];
            salario[k] = salario[k+1];
            moroso[k] = moroso[k+1];
        }

        return --n;
    }

    public static void modificarEstadoMoroso() {
        int i = 0;
        String cliente = JOptionPane.showInputDialog("Ingrese el nombre del cliente");

        while (i <= n && !cliente.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            JOptionPane.showMessageDialog(null, "No se encuentra un cliente llamado " + cliente);
            return;
        }
        
        moroso[i] = JOptionPane.showConfirmDialog(null, "¿El cliente tiene el estado moroso?", 
            "", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION;
    }

    public static void imprimirDatosDeUnCliente() {
        int i = 0;
        String cliente = JOptionPane.showInputDialog("Ingrese el nombre del cliente a mostrar");
        String mensaje = """
            Nombre Completo \tTelefono \tSalario \tMoroso""";

        while (i <= n && !cliente.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            JOptionPane.showMessageDialog(null, "No se encuentra un cliente llamado " + cliente);
            return;
        }
        
        mensaje += String.format("""
            \n%s \t%s \t%.2f \t%s""", nombre[i], telefono[i], salario[i], moroso[i] ? "Si" : "No");

        JTextArea imp = new JTextArea();
        imp.setText(mensaje);
        imp.setEditable(false);
        JOptionPane.showMessageDialog(null, imp);
    }
    
    public static void imprimirTodosLosDatos() {
        String mensaje = """
            Nombre Completo \tTelefono \tSalario \tMoroso""";

        for (int i = 0; i <= n; i++)
            mensaje += String.format("""
                \n%s \t%s \t%.2f \t%s""", nombre[i], telefono[i], salario[i], 
                moroso[i] ? "Si" : "No");

        JTextArea imp = new JTextArea();
        imp.setText(mensaje);
        imp.setEditable(false);
        JOptionPane.showMessageDialog(null, imp);
    }
}
