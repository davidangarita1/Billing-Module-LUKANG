package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Detail;
import co.com.sofka.BillingModule.services.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/detail")
@CrossOrigin(origins = "*")
public class DetailController {

    @Autowired
    private DetailService service;

    @GetMapping(value = "/all")
    public Iterable<Detail> list() {
        return service.list();
    }

    @PostMapping(value = "/save")
    public Detail save(@RequestBody Detail detail){
        return service.save(detail);
    }

    @PutMapping(value = "/update")
    public Detail update(@RequestBody Detail detail){
        if(detail.getId() != null){
            return service.save(detail);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "/{id}")
    public Detail get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
