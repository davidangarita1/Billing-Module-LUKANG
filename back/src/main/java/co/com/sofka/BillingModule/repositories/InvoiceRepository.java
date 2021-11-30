package co.com.sofka.BillingModule.repositories;

import co.com.sofka.BillingModule.models.Invoice;
import org.springframework.data.repository.CrudRepository;

public interface InvoiceRepository extends CrudRepository<Invoice, Long> {
}
