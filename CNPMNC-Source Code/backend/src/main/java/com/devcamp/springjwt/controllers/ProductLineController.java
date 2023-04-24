package com.devcamp.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.springjwt.models.ProductLine;
import com.devcamp.springjwt.security.services.ProductLineService;

@RestController
@CrossOrigin
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
public class ProductLineController {
    @Autowired 
    ProductLineService productLineService;

    @GetMapping("/product-line")
    public List<ProductLine> getAllProductLines() {
        return productLineService.getAllProductLine();
    }
}
