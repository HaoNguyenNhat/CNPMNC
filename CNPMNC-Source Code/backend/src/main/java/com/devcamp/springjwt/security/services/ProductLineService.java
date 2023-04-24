package com.devcamp.springjwt.security.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.devcamp.springjwt.models.ProductLine;
import com.devcamp.springjwt.repository.ProductLineRepository;

@Service
public class ProductLineService {
    @Autowired
    ProductLineRepository productLineRepository;

    public List<ProductLine> getAllProductLine() {
        return productLineRepository.findAll();
    }
}
