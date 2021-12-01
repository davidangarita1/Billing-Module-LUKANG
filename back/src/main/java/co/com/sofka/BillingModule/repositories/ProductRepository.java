package co.com.sofka.BillingModule.repositories;

import co.com.sofka.BillingModule.models.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
}
