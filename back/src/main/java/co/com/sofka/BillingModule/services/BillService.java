package co.com.sofka.BillingModule.services;

import co.com.sofka.BillingModule.models.Bill;
import co.com.sofka.BillingModule.repositories.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillService {

    @Autowired
    private BillRepository repository;

    public Iterable<Bill> list() {
        return repository.findAll();
    }

    public Bill get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Bill save(Bill bill) {
        return repository.save(bill);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
