package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Category;
import co.com.sofka.BillingModule.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping(value = "/all")
    public Iterable<Category> list() {
        return service.list();
    }

    @GetMapping(value = "/{id}")
    public Category get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @PostMapping(value = "/save")
    public Category save(@RequestBody Category category){
        return service.save(category);
    }

    @PutMapping(value = "/update")
    public Category update(@RequestBody Category category){
        if(category.getId() != null){
            return service.save(category);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }
}
