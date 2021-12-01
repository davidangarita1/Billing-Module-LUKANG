package co.com.sofka.BillingModule.repositories;

import co.com.sofka.BillingModule.models.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
}
