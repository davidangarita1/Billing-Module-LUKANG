package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Product;
import co.com.sofka.BillingModule.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping(value = "/all")
    public Iterable<Product> list() {
        return service.list();
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

    @GetMapping(value = "/search/{id}")
    public Product get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @GetMapping("/{name}")
    public Product getByNames(@RequestBody Product name) {
        Product product = service.getByName(name);
        if(product != null)  {
            return this.service.getByName(name);
        } return null;
    }
}
