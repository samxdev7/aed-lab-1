package uni.AEDLab1.ArreglosOrdenados;

import java.util.Arrays;
import javax.swing.*;

/**
 * 4. Una compañía necesita almacenar en arreglos la siguiente información de cada uno
 * de sus empleados ordenados alfabéticamente por el nombre: Nombre, Dirección, Edad,
 * Sexo, Años de antigüedad. Escribir un programa que realice las siguientes operaciones:
 *      1. Listar los datos de todos los empleados
 *      2. Dar de alta a un empleado
 *      3. Dar de baja a un empleado
 *      4. Modificar los años de antigüedad de un empleado
 *      5. Listar los datos de un empleado determinado
 *      6. Salir.
 */

public class Ejercicio5 {
    static int tam;
    static int n;
    
    static String[] nombre;
    static String[] direccion;
    static int[] edad;
    static String[] sexo;
    static int[] añosDeAntiguedad;
    
    public static void main(String[] args) {
        tam = Integer.parseInt(JOptionPane.showInputDialog(
            "Ingrese la cantidad total de empleados"));
        n = -1;
        
        int opt;

        nombre = new String[tam];
        float[] salario = new float[tam];

        Arrays.fill(nombre, "");
        Arrays.fill(direccion, "");
        Arrays.fill(sexo, "");

        do {
            opt = Integer.parseInt(JOptionPane.showInputDialog("""
                Ingrese una de las siguientes opciones:
                1. Listar los datos de todos los empleados
                2. Dar de alta a un empleado
                3. Dar de baja a un empleado
                4. Modificar los años de antigüedad de un empleado
                5. Listar los datos de un empleado determinado
                6. Salir."""));

            switch (opt) {
                case 1 -> n = agregarEmpleado();
                case 2 -> n = eliminarEmpleado();
                case 3 -> modificarAniosDeAntiguedad();
                case 4 -> listarUnEmpleadoDterminado();
                case 5 -> listarTodosLosEmpleados();
                case 6 -> {}
                default -> JOptionPane.showMessageDialog(null, "Opción no encontrada");
            }

        } while (opt != 6);

        System.exit(0);
    }

    public static int buscarEmpleado(String empleado) {
        int i = 0;

        while ((i <= n) && (nombre[i].compareTo(empleado) < 0)) i++;
        return ((i > n) || (nombre[i].compareTo(empleado) > 0)) ? -i : i;
    }

    public static int agregarEmpleado() {
        int pos;
        String empleado;

        if (n >= tam - 1) {
            JOptionPane.showMessageDialog(null, "No hay espacio en el array");
            return n;
        }

        empleado = JOptionPane.showInputDialog(null, "Ingrese el nombre del empleado");
        pos = buscarEmpleado(empleado);

        if ((pos >= 0) && (nombre[pos].equals(empleado))) {
            JOptionPane.showMessageDialog(null, "Este empleado ya está registrado");
            return n;
        }

        n++;
        pos *= -1;

        for (int i = n; i >= pos + 1; i--) {
            nombre[i] = nombre[i-1];
            direccion[i] = direccion[i-1];
            edad[i] = edad[i-1];
            sexo[i] = sexo[i-1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i-1];
        }

        nombre[pos] = empleado;
        direccion[pos] = JOptionPane.showInputDialog(null,
                "Ingrese la direccion del empleado");
        edad[pos] = Integer.parseInt(JOptionPane.showInputDialog(null,
                "Ingrese la edad del empleado"));
        sexo[pos] = JOptionPane.showInputDialog(null,
                "Ingrese el sexo del empleado");
        añosDeAntiguedad[pos] = Integer.parseInt(JOptionPane.showInputDialog(null,
                "Ingrese los años de antiguedad del empleado"));
        return n;
    }

    public static int eliminarEmpleado() {
        int pos;
        String empleado;

        if (n < 0) {
            JOptionPane.showMessageDialog(null, "El array está vacío");
            return n;
        }

        empleado = JOptionPane.showInputDialog(null, "Ingrese el nombre del empleado");
        pos = buscarEmpleado(empleado);

        if (pos < 0) {
            JOptionPane.showMessageDialog(null, empleado + " no está registrado");
            return n;
        }

        n--;
        for (int i = pos; i <= n; i++) {
            nombre[i] = nombre[i+1];
            direccion[i] = direccion[i+1];
            edad[i] = edad[i+1];
            sexo[i] = sexo[i+1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i+1];
        }

        return n;
    }

    public static void modificarAniosDeAntiguedad() {
        int pos;
        int añosDeAntiguedadModificado;
        String empleado;

        empleado = JOptionPane.showInputDialog("Ingrese el nombre del empleado");
        pos = buscarEmpleado(empleado);

        if ((pos < 0) && (empleado.compareTo(nombre[0]) != 0)) {
            JOptionPane.showMessageDialog(null, empleado + " no existe");
            return;
        }
        
        añosDeAntiguedadModificado = Integer.parseInt(JOptionPane.showInputDialog(
            null, "Ingrese los años de antiguedad"));

        if (pos == 0) {
            añosDeAntiguedad[0] = añosDeAntiguedadModificado;
            return;
        }

        if (pos == n) {
            añosDeAntiguedad[n] = añosDeAntiguedadModificado;
            return;
        }

        if (empleado.compareTo(nombre[pos + 1]) < 0 && empleado.compareTo(nombre[pos - 1]) > 0) {
            añosDeAntiguedad[pos] = añosDeAntiguedadModificado;
            return;
        }

        JOptionPane.showMessageDialog(null, "Altera el orden");
    }

    public static void listarUnEmpleadoDterminado() {
        String message, empleado;
        int pos;

        empleado = JOptionPane.showInputDialog(null, "Ingrese el nombre del empleado");
        pos = buscarEmpleado(empleado);

        if (pos < 0) {
            JOptionPane.showMessageDialog(null, "Empleado no encontrado");
            return;
        }

        message = "Empleado\t\tDireccion\t\tEdad\t\tSexo\t\tAños de Antiguedad";
        message += "\n" + nombre[pos] + "\t\t" + direccion[pos] + "\t\t" + edad[pos] + "\t\t" + 
            sexo[pos] + "\t\t" + añosDeAntiguedad[pos];

        JTextArea prt = new JTextArea();
        prt.setText(message);
        prt.setEditable(false);
        JOptionPane.showMessageDialog(null, prt);
    }

    public static void listarTodosLosEmpleados() {
        String message = "Empleado\t\tDireccion\t\tEdad\t\tSexo\t\tAños de Antiguedad";
        
        for (int i = 0; i <= n; i++)
            message += "\n" + nombre[i] + "\t\t" + direccion[i] + "\t\t" + edad[i] + "\t\t" + 
                sexo[i] + "\t\t" + añosDeAntiguedad[i];

        JTextArea prt = new JTextArea();
        prt.setText(message);
        prt.setEditable(false);
        JOptionPane.showMessageDialog(null, prt);
    }
}
