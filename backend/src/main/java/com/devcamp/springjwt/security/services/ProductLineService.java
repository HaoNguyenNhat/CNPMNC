package com.devcamp.springjwt.security.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.devcamp.springjwt.models.ProductLine;
import com.devcamp.springjwt.repository.ProductLineRepository;

@Service
public class ProductLineService {
    @Autowired
    ProductLineRepository productLineRepository;

    public ResponseEntity<List<ProductLine>> getAllProductLine() {
        try {
            List<ProductLine> listProductLine = new ArrayList<>();
            productLineRepository.findAll().forEach(listProductLine::add);
            return new ResponseEntity<List<ProductLine>>(listProductLine, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    public ResponseEntity<ProductLine> createProductLine(ProductLine productLine) {
        try {
            ProductLine newProductLine = new ProductLine();

            newProductLine.setProductLine(productLine.getProductLine());
            return new ResponseEntity<ProductLine>(productLineRepository.save(newProductLine), HttpStatus.CREATED);
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
