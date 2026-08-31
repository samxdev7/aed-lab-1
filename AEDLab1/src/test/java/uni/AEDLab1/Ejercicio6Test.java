package uni.AEDLab1;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import uni.AEDLab1.models.VendedorDto;
import uni.AEDLab1.services.Ejercicio6;

class Ejercicio6Test {

    @Test
    void testInicializacion() {
        Ejercicio6 servicio = new Ejercicio6(5);
        assertEquals(5, servicio.getTam());
        VendedorDto[] todos = servicio.imprimirTodosLosDatos();
        assertNotNull(todos);
        assertEquals(0, todos.length);
    }

    @Test
    void testAgregarVendedorConOrdenAlfabetic() {
        Ejercicio6 servicio = new Ejercicio6(3);
        
        // Agregar "Carlos"
        VendedorDto v1 = new VendedorDto(3, "Carlos", 1000f);
        assertTrue(servicio.agregarVendedor(v1));
        
        // Agregar "Ana" - debe insertarse al inicio
        VendedorDto v2 = new VendedorDto(3, "Ana", 1500f);
        assertTrue(servicio.agregarVendedor(v2));
        
        // Agregar "Beto" - debe insertarse entre Ana y Carlos
        VendedorDto v3 = new VendedorDto(3, "Beto", 2000f);
        assertTrue(servicio.agregarVendedor(v3));

        VendedorDto[] todos = servicio.imprimirTodosLosDatos();
        assertEquals(3, todos.length);
        
        // Verificar orden alfabético
        assertEquals("Ana", todos[0].getNombre());
        assertEquals(1500f, todos[0].getTotalVentas());
        
        assertEquals("Beto", todos[1].getNombre());
        assertEquals(2000f, todos[1].getTotalVentas());
        
        assertEquals("Carlos", todos[2].getNombre());
        assertEquals(1000f, todos[2].getTotalVentas());
    }

    @Test
    void testNoPermiteDuplicados() {
        Ejercicio6 servicio = new Ejercicio6(5);
        VendedorDto v1 = new VendedorDto(5, "Carlos", 1000f);
        assertTrue(servicio.agregarVendedor(v1));
        
        // Mismo nombre, diferente ventas
        VendedorDto v2 = new VendedorDto(5, "Carlos", 2000f);
        assertFalse(servicio.agregarVendedor(v2));
        
        // Mismo nombre, ignorando mayúsculas/minúsculas
        VendedorDto v3 = new VendedorDto(5, "carlos", 500f);
        assertFalse(servicio.agregarVendedor(v3));

        VendedorDto[] todos = servicio.imprimirTodosLosDatos();
        assertEquals(1, todos.length);
    }

    @Test
    void testLimiteArregloLleno() {
        Ejercicio6 servicio = new Ejercicio6(2);
        
        VendedorDto v1 = new VendedorDto(2, "Juan", 100f);
        VendedorDto v2 = new VendedorDto(2, "Maria", 200f);
        VendedorDto v3 = new VendedorDto(2, "Pedro", 300f);
        
        assertTrue(servicio.agregarVendedor(v1));
        assertTrue(servicio.agregarVendedor(v2));
        // Intentar agregar un tercero en un arreglo de tamaño 2
        assertFalse(servicio.agregarVendedor(v3));
        
        VendedorDto[] todos = servicio.imprimirTodosLosDatos();
        assertEquals(2, todos.length);
    }

    @Test
    void testModificarVentas() {
        Ejercicio6 servicio = new Ejercicio6(5);
        
        VendedorDto v1 = new VendedorDto(5, "Sofia", 1500f);
        assertTrue(servicio.agregarVendedor(v1));
        
        // Modificar vendedor registrado
        VendedorDto vModificado = new VendedorDto(5, "Sofia", 2500f);
        assertTrue(servicio.modificarVentas(vModificado));
        
        VendedorDto consultado = servicio.imprimirDatosDeUnVendedor("Sofia");
        assertNotNull(consultado);
        assertEquals(2500f, consultado.getTotalVentas());
        
        // Intentar modificar vendedor inexistente
        VendedorDto vInexistente = new VendedorDto(5, "Pedro", 100f);
        assertFalse(servicio.modificarVentas(vInexistente));
    }

    @Test
    void testBuscarVendedor() {
        Ejercicio6 servicio = new Ejercicio6(5);
        VendedorDto v1 = new VendedorDto(5, "Lucas", 800f);
        servicio.agregarVendedor(v1);
        
        // Encontrado (ignorando mayúsculas/minúsculas)
        VendedorDto encontrado = servicio.imprimirDatosDeUnVendedor("lucas");
        assertNotNull(encontrado);
        assertEquals("Lucas", encontrado.getNombre());
        assertEquals(800f, encontrado.getTotalVentas());
        
        // No encontrado
        assertNull(servicio.imprimirDatosDeUnVendedor("Inexistente"));
    }

    @Test
    void testValidacionEntradasNulasOVacias() {
        Ejercicio6 servicio = new Ejercicio6(5);
        
        // Objeto nulo
        assertFalse(servicio.agregarVendedor(null));
        assertFalse(servicio.modificarVentas(null));
        
        // Nombre nulo
        VendedorDto vNullName = new VendedorDto(5, null, 100f);
        assertFalse(servicio.agregarVendedor(vNullName));
        assertFalse(servicio.modificarVentas(vNullName));
        
        // Nombre vacío
        VendedorDto vEmptyName = new VendedorDto(5, "  ", 100f);
        assertFalse(servicio.agregarVendedor(vEmptyName));
        assertFalse(servicio.modificarVentas(vEmptyName));
        
        // Buscar con nombre vacío/nulo
        assertNull(servicio.imprimirDatosDeUnVendedor(null));
        assertNull(servicio.imprimirDatosDeUnVendedor(""));
    }
}
