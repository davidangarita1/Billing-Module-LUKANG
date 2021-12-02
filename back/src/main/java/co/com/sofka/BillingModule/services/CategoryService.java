package co.com.sofka.BillingModule.services;

import co.com.sofka.BillingModule.models.Category;
import co.com.sofka.BillingModule.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public Iterable<Category> list() {
        return repository.findAll();
    }

    public Category get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Category save(Category category) {
        return repository.save(category);
    }

    public void delete(Long id) {
        repository.delete(get(id));
    }
}
