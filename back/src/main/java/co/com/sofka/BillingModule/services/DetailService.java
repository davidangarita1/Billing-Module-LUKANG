package co.com.sofka.BillingModule.services;

import co.com.sofka.BillingModule.models.Detail;
import co.com.sofka.BillingModule.repositories.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetailService {

    @Autowired
    private DetailRepository repository;

    public Iterable<Detail> list() {
        return repository.findAll();
    }

    public Detail get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Detail save(Detail detail) {
        return repository.save(detail);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
