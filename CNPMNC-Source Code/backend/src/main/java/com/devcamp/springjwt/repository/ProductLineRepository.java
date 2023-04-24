package com.devcamp.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devcamp.springjwt.models.ProductLine;

public interface ProductLineRepository extends JpaRepository<ProductLine, Integer> {
    
}
