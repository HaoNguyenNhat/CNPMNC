package com.devcamp.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.springjwt.models.ProductLine;
import com.devcamp.springjwt.security.services.ProductLineService;

@RestController
@CrossOrigin
@RequestMapping("/fastfood/api/noauth/")
public class ProductLineController {
    @Autowired 
    ProductLineService productLineService;

    @GetMapping("product-line")
    public ResponseEntity<List<ProductLine>> getAllProductLines() {
       return productLineService.getAllProductLine();
    }

    @PostMapping("product-line")
    public ResponseEntity<ProductLine> createProductLine(@RequestBody ProductLine productLine) {
        return productLineService.createProductLine(productLine);
    }
}
