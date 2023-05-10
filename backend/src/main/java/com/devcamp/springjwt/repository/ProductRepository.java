package com.devcamp.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.springjwt.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
