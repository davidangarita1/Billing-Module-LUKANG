package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Invoice;
import co.com.sofka.BillingModule.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/invoice")
@CrossOrigin(origins = "*")
public class InvoiceController {

    @Autowired
    private InvoiceService service;

    @GetMapping(value = "/all")
    public Iterable<Invoice> list() {
        return service.list();
    }

    @PostMapping(value = "/save")
    public Invoice save(@RequestBody Invoice invoice){
        return service.save(invoice);
    }

    @PutMapping(value = "/update")
    public Invoice update(@RequestBody Invoice invoice){
        if(invoice.getId() != null){
            return service.save(invoice);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "/{id}")
    public Invoice get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
