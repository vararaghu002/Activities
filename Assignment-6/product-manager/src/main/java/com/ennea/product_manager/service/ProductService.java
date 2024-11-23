package com.ennea.product_manager.service;

import com.ennea.product_manager.model.Product;
import com.ennea.product_manager.repository.Productrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private Productrepo repo;


    public List<Product> getAllProducts() {
      return repo.findAll();
    }

    public Product addProduct(Product product) {
        return repo.save(product);
    }
}
