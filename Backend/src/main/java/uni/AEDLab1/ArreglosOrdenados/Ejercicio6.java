package uni.AEDLab1.ArreglosOrdenados;

import java.util.Arrays;
import javax.swing.*;

/**
 * 5. Una inmobiliaria necesita almacenar la siguiente información sobre los departamentos 
 * rentados que se encuentran ordenados ascendentemente por la extensión del departamento:
 *      • Ubicación del departamento (dirección)
 *      • Extensión del departamento (superficie en metros cuadrados de cada departamento)
 *      • Precio
 *      • Número de apartamento
 *      • Nombre de la persona que rentó el departamento
 * Escriba un programa que pueda llevar a cabo las siguientes operaciones.
 *      1. Dar de alta a un departamento (Se renta y se pide la información)
 *      2. Dar de baja al departamento (Se libera el departamento)
 *      3. Modificar el precio de un departamento por medio de su número.
 *      4. Listar los datos de un departamento determinado.
 *      5. Listar los datos de todos los registros.
 *      6. Salir
 */

public class Ejercicio6 {
    static int tam;
    static int n;
    
    static String[] direccionDeDepartamento;
    static float[] extension;
    static float[] precio;
    static String[] numeroDeApartamento;
    static String[] inquilino;
    
    public static void main(String[] args) {
        tam = Integer.parseInt(JOptionPane.showInputDialog(
            "Ingrese la cantidad total de departamentos"));
        n = -1;
        
        int opt;

        direccionDeDepartamento = new String[tam];
        float[] salario = new float[tam];

        Arrays.fill(direccionDeDepartamento, "");
        Arrays.fill(numeroDeApartamento, "");
        Arrays.fill(inquilino, "");

        do {
            opt = Integer.parseInt(JOptionPane.showInputDialog("""
                Ingrese una de las siguientes opciones:
                1. Dar de alta a un departamento (Se renta y se pide la información)
                2. Dar de baja al departamento (Se libera el departamento)
                3. Modificar el precio de un departamento por medio de su número.
                4. Listar los datos de un departamento determinado.
                5. Listar los datos de todos los registros.
                6. Salir"""));

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

    public static int buscarEmpleado(String departamento) {
        int i = 0;

        while ((i <= n) && (direccionDeDepartamento[i].compareTo(departamento) < 0)) i++;
        return ((i > n) || (direccionDeDepartamento[i].compareTo(departamento) > 0)) ? -i : i;
    }

    public static int agregarEmpleado() {
        int pos;
        String departamento;

        if (n >= tam - 1) {
            JOptionPane.showMessageDialog(null, "No hay espacio en el array");
            return n;
        }

        departamento = JOptionPane.showInputDialog(null, "Ingrese el direccionDeDepartamento del departamento");
        pos = buscarEmpleado(departamento);

        if ((pos >= 0) && (direccionDeDepartamento[pos].equals(departamento))) {
            JOptionPane.showMessageDialog(null, "Este departamento ya está registrado");
            return n;
        }

        n++;
        pos *= -1;

        for (int i = n; i >= pos + 1; i--) {
            direccionDeDepartamento[i] = direccionDeDepartamento[i-1];
            numeroDeApartamento[i] = numeroDeApartamento[i-1];
            edad[i] = edad[i-1];
            sexo[i] = sexo[i-1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i-1];
        }

        direccionDeDepartamento[pos] = departamento;
        numeroDeApartamento[pos] = JOptionPane.showInputDialog(null,
                "Ingrese la direccion del departamento");
        edad[pos] = Integer.parseInt(JOptionPane.showInputDialog(null,
                "Ingrese la edad del departamento"));
        sexo[pos] = JOptionPane.showInputDialog(null,
                "Ingrese el sexo del departamento");
        añosDeAntiguedad[pos] = Integer.parseInt(JOptionPane.showInputDialog(null,
                "Ingrese los años de antiguedad del departamento"));
        return n;
    }

    public static int eliminarEmpleado() {
        int pos;
        String departamento;

        if (n < 0) {
            JOptionPane.showMessageDialog(null, "El array está vacío");
            return n;
        }

        departamento = JOptionPane.showInputDialog(null, "Ingrese el direccionDeDepartamento del departamento");
        pos = buscarEmpleado(departamento);

        if (pos < 0) {
            JOptionPane.showMessageDialog(null, departamento + " no está registrado");
            return n;
        }

        n--;
        for (int i = pos; i <= n; i++) {
            direccionDeDepartamento[i] = direccionDeDepartamento[i+1];
            numeroDeApartamento[i] = numeroDeApartamento[i+1];
            edad[i] = edad[i+1];
            sexo[i] = sexo[i+1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i+1];
        }

        return n;
    }

    public static void modificarAniosDeAntiguedad() {
        int pos;
        int añosDeAntiguedadModificado;
        String departamento;

        departamento = JOptionPane.showInputDialog("Ingrese el direccionDeDepartamento del departamento");
        pos = buscarEmpleado(departamento);

        if ((pos < 0) && (departamento.compareTo(direccionDeDepartamento[0]) != 0)) {
            JOptionPane.showMessageDialog(null, departamento + " no existe");
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

        if (departamento.compareTo(direccionDeDepartamento[pos + 1]) < 0 && departamento.compareTo(direccionDeDepartamento[pos - 1]) > 0) {
            añosDeAntiguedad[pos] = añosDeAntiguedadModificado;
            return;
        }

        JOptionPane.showMessageDialog(null, "Altera el orden");
    }

    public static void listarUnEmpleadoDterminado() {
        String message, departamento;
        int pos;

        departamento = JOptionPane.showInputDialog(null, "Ingrese el direccionDeDepartamento del departamento");
        pos = buscarEmpleado(departamento);

        if (pos < 0) {
            JOptionPane.showMessageDialog(null, "Empleado no encontrado");
            return;
        }

        message = "Empleado\t\tDireccion\t\tEdad\t\tSexo\t\tAños de Antiguedad";
        message += "\n" + direccionDeDepartamento[pos] + "\t\t" + numeroDeApartamento[pos] + "\t\t" + edad[pos] + "\t\t" + 
            sexo[pos] + "\t\t" + añosDeAntiguedad[pos];

        JTextArea prt = new JTextArea();
        prt.setText(message);
        prt.setEditable(false);
        JOptionPane.showMessageDialog(null, prt);
    }

    public static void listarTodosLosEmpleados() {
        String message = "Empleado\t\tDireccion\t\tEdad\t\tSexo\t\tAños de Antiguedad";
        
        for (int i = 0; i <= n; i++)
            message += "\n" + direccionDeDepartamento[i] + "\t\t" + numeroDeApartamento[i] + "\t\t" + edad[i] + "\t\t" + 
                sexo[i] + "\t\t" + añosDeAntiguedad[i];

        JTextArea prt = new JTextArea();
        prt.setText(message);
        prt.setEditable(false);
        JOptionPane.showMessageDialog(null, prt);
    }
}
