package co.com.sofka.BillingModule.services;

import co.com.sofka.BillingModule.models.Invoice;
import co.com.sofka.BillingModule.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository repository;

    public Iterable<Invoice> list() {
        return repository.findAll();
    }

    public Invoice get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Invoice save(Invoice invoice) {
        return repository.save(invoice);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
