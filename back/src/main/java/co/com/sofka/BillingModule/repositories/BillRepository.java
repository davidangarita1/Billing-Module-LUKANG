package co.com.sofka.BillingModule.repositories;

import co.com.sofka.BillingModule.models.Bill;
import org.springframework.data.repository.CrudRepository;

public interface BillRepository extends CrudRepository<Bill, Long> {
}
