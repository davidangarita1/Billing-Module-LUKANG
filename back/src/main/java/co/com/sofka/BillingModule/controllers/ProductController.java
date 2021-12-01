package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Product;
import co.com.sofka.BillingModule.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping(value = "/all")
    public Iterable<Product> list() {
        return service.list();
    }

    @GetMapping(value = "/{id}")
    public Product get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @PostMapping(value = "/save")
    public Product save(@RequestBody Product product){
        return service.save(product);
    }

    @PutMapping(value = "/update")
    public Product update(@RequestBody Product product){
        if(product.getId() != null){
            return service.save(product);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }
}
