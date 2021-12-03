# Sistema de facturación LUKANG

## Instrucciones

## Backend
Para explicar el funcionamiento del backend tomaremos de ejemplo la tabla de producto y nos ubicaremos en la siguiente ruta:

Ruta: ./back/src/main/java/co/com/sofka/BillingModule/ProductController.java

Veremos el siguiente código con sus comentarios explicativos:
```java
@RestController // Referencia de JPA para Controller.
@RequestMapping("/api/v1/product") // Ruta para gestión de acciones de producto.
@CrossOrigin(origins = "*") // Anotación para recibir solicitudes del front-end.
public class ProductController {

    @Autowired
    private ProductService service; // Importamos el ProductService

	// Este método hace la consulta de todos los registros de producto a la base de datos.
    @GetMapping(value = "/all")
    public Iterable<Product> list() {
        return service.list();
    }

	// Este método hace la consulta a la base de datos de un registro por id.
    @GetMapping(value = "/{id}")
    public Product get(@PathVariable("id") Long id){
        return service.get(id);
    }

	// Este método crea un registro nuevo de producto en la base de datos.
    @PostMapping(value = "/save")
    public Product save(@RequestBody Product product){
        return service.save(product);
    }

	// Este método actualiza un registro previamente cargado de producto en la base de datos.
    @PutMapping(value = "/update")
    public Product update(@RequestBody Product product){
        if(product.getId() != null){
            return service.save(product);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

	// Este método encargada de eliminar registros individualmente por id.
    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }
}
```

## Interfaz de usuario
## Modulo de productos e inventarios
En este módulo podrá encontrar el listado de productos que ofrece la empresa, su Id, Nombre, Categoría y Precio unitario, en esta página podrá modificar, eliminar y crear tantos productos como el cliente lo requiera.
Para realizar modificaciones a la lista de productos  vamos a el menú – productos y en esta pagina podremos realizar las acciones relacionadas a los productos.
![image](https://user-images.githubusercontent.com/92315994/144426196-bed8247c-0ed5-4de1-86d8-57d9f725b139.png)

Si presionamos agregar producto, se nos abrirá una ventana donde se deben diligenciar las características del producto y guardar los cambios presionando el botón de agregar.

![image](https://user-images.githubusercontent.com/92315994/144426628-f7b5f0f6-e5d8-4172-b117-9eff181a10bc.png)

En el modulo de productos se puede modificar o eliminar productos con las acciones.

![image](https://user-images.githubusercontent.com/92315994/144427071-0e3fdc0c-4da7-4220-b7e6-e4376e39c66e.png)

## Modulo de clientes
Este módulo se encarga de agregar y gestionar a la base de datos de los clientes, en este modulo se ingresan modifican y eliminan los clientes.
![image](https://user-images.githubusercontent.com/92315994/144473596-c62879c1-ee5e-430a-a582-ba667b628e5b.png)


![image](https://user-images.githubusercontent.com/92315994/144468247-756f66d1-832c-4d18-8430-92afe9776298.png) ![image](https://user-images.githubusercontent.com/92315994/144470939-ab049074-9d7b-4b2b-894b-c37b231374dd.png)


Aquí podrás crear nuevos clientes, presione el botón Agregar cliente y diligencie el formulario, al finalizar presione agrega.(La misma metodologia que al agregar producto)



## Modulo de facturación
En el apartado Factura podrá realizar las facturas que requiera, podrá apreciar la información resumida de las facturas realizadas.
Para elaborar una factura presione el botón Crear Factura y a continuación diligencie el formulario,
![image](https://user-images.githubusercontent.com/92315994/144474106-7717e76d-a559-4d51-91c6-dd2336281901.png)

Después de ingresar la información requerida podrá guardar la factura para su posterior visualización e impresión.
![image](https://user-images.githubusercontent.com/92315994/144541231-e4d4532a-57b7-430c-991d-17ea5c1c05d3.png)



