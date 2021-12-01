package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Client;
import co.com.sofka.BillingModule.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/client")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientService service;

    @GetMapping(value = "/all")
    public Iterable<Client> list() {
        return service.list();
    }

    @GetMapping(value = "/{id}")
    public Client get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @PostMapping(value = "/save")
    public Client save(@RequestBody Client client){
        return service.save(client);
    }

    @PutMapping(value = "/update")
    public Client update(@RequestBody Client client){
        if(client.getId() != null){
            return service.save(client);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }
}
