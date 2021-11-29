package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Product;
import co.com.sofka.BillingModule.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping(value = "api/productlist")
    public Iterable<Product> list() {
        return service.list();
    }

    @PostMapping(value = "api/product")
    public Product save(@RequestBody Product product){
        return service.save(product);
    }

    @PutMapping(value = "api/product")
    public Product update(@RequestBody Product product){
        if(product.getId() != null){
            return service.save(product);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/product")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/product")
    public Product get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
