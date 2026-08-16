package uni.AEDLab1.ArreglosDesordenados;

import javax.swing.*;

/**
 * 3. El departamento de personal de una empresa necesita almacenar en arreglos desordenados el 
 * nombre, sexo y edad de cada uno de los empleados adscritos al mismo. Escriba un programa que 
 * realice las siguientes operaciones:
 *      1. Dar de alta a un empleado.
 *      2. Dar de baja a un empleado.
 *      3. Actualizar la edad de un empleado determinado. (Modificar)
 *      4. Imprimir todos los registros de los empleados varones.
 *      5. Imprimir un registro determinado.
 *      6. Salir.
 */

public class Ejercicio3 {
    static int tam;
    static int n;
    
    static String[] nombre;
    static String[] sexo;
    static int[] edad;
    
    public static void main(String[] args) {
        tam = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el tamaño del arreglo"));
        n = -1;
        
        nombre = new String[tam];
        sexo = new String[tam];
        edad = new int[tam];
        
        int opt;
        do {
            opt = Integer.parseInt(JOptionPane.showInputDialog("""
                Menu de Opciones:
                1. Dar de alta a un empleado.
                2. Dar de baja a un empleado.
                3. Actualizar la edad de un empleado determinado. (Modificar)
                4. Imprimir todos los registros de los empleados varones.
                5. Imprimir un registro determinado.
                6. Salir."""));

            switch (opt) {
                case 1 -> n = agregarEmpleado();
                case 2 -> n = eliminarEmpleado();
                case 3 -> modificarEdad();
                case 4 -> imprimirDatosDeUnEmpleado();
                case 5 -> imprimirTodosLosDatos();
                case 6 -> {}
                default -> JOptionPane.showMessageDialog(null, "Opción invalida");
            }
        } while (opt != 6);

        System.exit(0);
    }

    public static int agregarEmpleado() {
        if (n >= tam - 1) {
            JOptionPane.showMessageDialog(null, "No hay espacio");
            return n;
        }
        
        nombre[++n] = JOptionPane.showInputDialog("Ingrese el nombre del empleado");
        sexo[n] = JOptionPane.showInputDialog("Ingrese el sexo del empleado");
        edad[n] = Integer.parseInt(
            JOptionPane.showInputDialog("Ingrese la edad del empleado"));

        return n;
    }

    public static int eliminarEmpleado() {
        int i = 0;
        String empleado = JOptionPane.showInputDialog(
            "Ingrese el nombre del empleado a eliminar");

        while (i <= n && !empleado.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) { 
            JOptionPane.showMessageDialog(null, "No se encuentra un empleado llamado " + empleado); 
            return n;
        }
        
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            sexo[k] = sexo[k+1];
            edad[k] = edad[k+1];
        }

        return --n;
    }

    public static void modificarEdad() {
        int i = 0;
        String empleado = JOptionPane.showInputDialog("Ingrese el nombre del empleado");

        while (i <= n && !empleado.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            JOptionPane.showMessageDialog(null, "No se encuentra un empleado llamado " + empleado);
            return;
        }
        
        edad[i] = Integer.parseInt(
            JOptionPane.showInputDialog("Ingrese la edad del empleado (modificacion)"));
    }

    public static void imprimirDatosDeUnEmpleado() {
        int i = 0;
        String empleado = JOptionPane.showInputDialog("Ingrese el nombre del empleado a mostrar");
        String mensaje = """
            Nombre Completo \tSexo \tEdad""";

        while (i <= n && !empleado.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            JOptionPane.showMessageDialog(null, "No se encuentra un empleado llamado " + empleado);
            return;
        }
        
        mensaje += String.format("""
            \n%s \t%s \t%d""", nombre[i], sexo[i], edad[i]);

        JTextArea imp = new JTextArea();
        imp.setText(mensaje);
        imp.setEditable(false);
        JOptionPane.showMessageDialog(null, imp);
    }
    
    public static void imprimirTodosLosDatos() {
        String mensaje = """
            Nombre Completo \tSexo \tEdad""";

        for (int i = 0; i <= n; i++)
            mensaje += String.format("""
                \n%s \t%s \t%d""", nombre[i], sexo[i], edad[i]);

        JTextArea imp = new JTextArea();
        imp.setText(mensaje);
        imp.setEditable(false);
        JOptionPane.showMessageDialog(null, imp);
    }
}
