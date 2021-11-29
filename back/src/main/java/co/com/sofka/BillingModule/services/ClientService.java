package co.com.sofka.BillingModule.services;

import co.com.sofka.BillingModule.models.Client;
import co.com.sofka.BillingModule.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository repository;

    public Iterable<Client> list() {
        return repository.findAll();
    }

    public Client get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Client getByName(Client name) {
        return repository.findByName(name.getName());
    }

    public Client save(Client client) {
        return repository.save(client);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
