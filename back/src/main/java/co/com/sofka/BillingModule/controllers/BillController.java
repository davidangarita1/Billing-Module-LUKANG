package co.com.sofka.BillingModule.controllers;

import co.com.sofka.BillingModule.models.Bill;
import co.com.sofka.BillingModule.services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BillController {

    @Autowired
    private BillService service;

    @GetMapping(value = "api/bills")
    public Iterable<Bill> list() {
        return service.list();
    }

    @PostMapping(value = "api/bill")
    public Bill save(@RequestBody Bill bill){
        return service.save(bill);
    }

    @PutMapping(value = "api/bill")
    public Bill update(@RequestBody Bill bill){
        if(bill.getId() != null){
            return service.save(bill);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/bill")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/bill")
    public Bill get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
