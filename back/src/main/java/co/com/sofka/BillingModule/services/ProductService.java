package co.com.sofka.BillingModule.services;

import co.com.sofka.BillingModule.models.Product;
import co.com.sofka.BillingModule.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public Iterable<Product> list() {
        return repository.findAll();
    }

    public Product get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Product save(Product product) {
        return repository.save(product);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
