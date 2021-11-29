package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Client;
import co.com.sofka.BillingModule.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService service;

    @GetMapping(value = "api/clientlist")
    public Iterable<Client> list() {
        return service.list();
    }

    @GetMapping("api/clientname")
    public Client getByNames(@RequestBody Client name) {
        Client client = service.getByName(name);
        if(client != null)  {
            return this.service.getByName(name);
        } return null;
    }

    @PostMapping(value = "api/client")
    public Client save(@RequestBody Client client){
        return service.save(client);
    }

    @PutMapping(value = "api/client")
    public Client update(@RequestBody Client client){
        if(client.getId() != null){
            return service.save(client);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/client")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/client")
    public Client get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
