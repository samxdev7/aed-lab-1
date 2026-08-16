package uni.AEDLab1.ArreglosDesordenados;

import javax.swing.*;

/**
 * 1. En una escuela se tienen que almacenar en arreglos los siguientes datos 
 * para cada alumno: Nombre completo, Numero de semestres cursados, 
 * Calificación promedio total. Escriba un programa que, dada la información 
 * realice las siguientes operaciones:
 *      1. Dar de alta a un alumno
 *      2. Dar de baja a un alumno
 *      3. Modificar número de semestre cursados y promedio total
 *      4. Listar nombre, numero de semestre cursado y promedio de un alumno
 *      determinado
 *      5. Listar todos los registros.
 *      6. Salir
 */

public class Ejercicio1 {
    static int tam;
    static int n;
    
    static String[] nombre;
    static int[] nSemestresCursados;
    static float[] promedioTotal;
    
    public static void main(String[] args) {
        tam = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el tamaño del arreglo"));
        n = -1;
        
        nombre = new String[tam];
        nSemestresCursados = new int[tam];
        promedioTotal = new float[tam];
        
        int opt;
        do {
            opt = Integer.parseInt(JOptionPane.showInputDialog("""
                Menu de Opciones:
                1. Dar de alta a un alumno
                2. Dar de baja a un alumno
                3. Modificar numero de semestres cursados y promedio total
                4. Imprimir datos de un alumno determinado
                5. Imprimir todos los datos
                6. Salir"""));

            switch (opt) {
                case 1 -> n = agregarAlumno();
                case 2 -> n = eliminarAlumno();
                case 3 -> modificarNSemestresYPromedio();
                case 4 -> imprimirDatosDeUnAlumno();
                case 5 -> imprimirTodosLosDatos();
                case 6 -> {}
                default -> JOptionPane.showMessageDialog(null, "Opción invalida");
            }
        } while (opt != 6);

        System.exit(0);
    }

    public static int agregarAlumno() {
        if (n >= tam - 1) {
            JOptionPane.showMessageDialog(null, "No hay espacio");
            return n;
        }
        
        nombre[++n] = JOptionPane.showInputDialog("Ingrese el nombre del estudiante");
        nSemestresCursados[n] = Integer.parseInt(
            JOptionPane.showInputDialog("Ingrese la cantidad de semestres cursados"));
        promedioTotal[n] = Float.parseFloat(
            JOptionPane.showInputDialog("Ingrese el promedio total"));

        return n;
    }

    public static int eliminarAlumno() {
        int i = 0;
        String estudiante = JOptionPane.showInputDialog(
            "Ingrese el nombre del estudiante a eliminar");

        while (i <= n && !estudiante.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) { 
            JOptionPane.showMessageDialog(null, "No se encuentra un alumno llamado " + estudiante); 
            return n;
        }
        
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            nSemestresCursados[k] = nSemestresCursados[k+1];
            promedioTotal[k] = promedioTotal[k+1];
        }

        return --n;
    }

    public static void modificarNSemestresYPromedio() {
        int i = 0;
        String estudiante = JOptionPane.showInputDialog("Ingrese el nombre del alumno");

        while (i <= n && !estudiante.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            JOptionPane.showMessageDialog(null, "No se encuentra un alumno llamado " + estudiante);
            return;
        }
        
        nSemestresCursados[i] = Integer.parseInt(JOptionPane.showInputDialog(null, 
            "Ingrese la cantidad de semestres cursados (modificacion)"));
        promedioTotal[i] = Float.parseFloat(JOptionPane.showInputDialog(null,
            "Ingrese el promedio total (modificacion)"));
    }

    public static void imprimirDatosDeUnAlumno() {
        int i = 0;
        String estudiante = JOptionPane.showInputDialog("Ingrese el nombre del alumno a mostrar");
        String mensaje = """
            Nombre Completo \tCantidad de Semestres Cursados \tPromedio Total""";

        while (i <= n && !estudiante.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            JOptionPane.showMessageDialog(null, "No se encuentra un alumno llamado " + estudiante);
            return;
        }
        
        mensaje += String.format("""
            \n%s \t%d \t%.2f""", nombre[i], nSemestresCursados[i], promedioTotal[i]);

        JTextArea imp = new JTextArea();
        imp.setText(mensaje);
        imp.setEditable(false);
        JOptionPane.showMessageDialog(null, imp);
    }
    
    public static void imprimirTodosLosDatos() {
        String mensaje = """
            Nombre Completo \tCantidad de Semestres Cursados \tPromedio Total""";

        for (int i = 0; i <= n; i++)
            mensaje += String.format("""
                \n%s \t%d \t%.2f""", nombre[i], nSemestresCursados[i], promedioTotal[i]);

        JTextArea imp = new JTextArea();
        imp.setText(mensaje);
        imp.setEditable(false);
        JOptionPane.showMessageDialog(null, imp);
    }
}
