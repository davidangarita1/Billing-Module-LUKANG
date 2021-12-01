# Sistema de facturación LUKANG

**Indice**

[TOCM]

## Instrucciones

## Backend
Para explicar el funcionamiento del backend tomaremos de ejemplo la tabla de producto y nos ubicaremos en la siguiente ruta:

Ruta: ./back/src/main/java/co/com/sofka/BillingModule/ProductController.java

Veremos el siguiente código con sus comentarios explicativos:
```java
@RestController // Referencia de JPA para Controller
@RequestMapping("/api/v1/product") // Ruta para gestión de acciones de producto
@CrossOrigin(origins = "*") // Anotación para recibir solicitudes del front-end
public class ProductController {

    @Autowired
    private ProductService service;

	// Esta linea hace la consulta de todos los registros de producto a la base de datos.
    @GetMapping(value = "/all")
    public Iterable<Product> list() {
        return service.list();
    }

	// Esta linea hace la consulta a la base de datos de un registro por id.
    @GetMapping(value = "/{id}")
    public Product get(@PathVariable("id") Long id){
        return service.get(id);
    }

	// Aqui podemos crear un registro nuevo de producto en la base de datos
    @PostMapping(value = "/save")
    public Product save(@RequestBody Product product){
        return service.save(product);
    }

	// Aqui podemos actualizar un registro previamente cargado de producto en la base de datos
    @PutMapping(value = "/update")
    public Product update(@RequestBody Product product){
        if(product.getId() != null){
            return service.save(product);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

	// Por ultimo la linea encargada de eliminar registros individualmente por id
    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }
}
```

