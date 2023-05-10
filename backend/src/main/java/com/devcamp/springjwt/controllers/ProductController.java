package com.devcamp.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.springjwt.models.Product;
import com.devcamp.springjwt.security.services.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/fastfood/api/noauth/")
public class ProductController {
    @Autowired 
    ProductService productService;

    @GetMapping("product")
    public ResponseEntity<List<Product>> getAllProduct(){
        return productService.getAllProduct();
    }
    
    @GetMapping("product/detail/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @PostMapping("product")
    public ResponseEntity<Object> createProduct(@RequestParam Integer productLineId, @RequestBody Product product) {
        return productService.createProduct(productLineId, product);
    }
}
