package com.devcamp.springjwt.security.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.springjwt.models.Product;
import com.devcamp.springjwt.models.ProductLine;
import com.devcamp.springjwt.repository.ProductLineRepository;
import com.devcamp.springjwt.repository.ProductRepository;

@RestController
@CrossOrigin
@RequestMapping("/fastfood/api/noauth/")
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductLineRepository productLineRepository;

    //-----------------------------------PUBLIC-----------------------------------//
    // lấy toàn bộ sản phẩm hiển thị lên trang
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            List<Product> listProduct = new ArrayList<>();
            productRepository.findAll().forEach(listProduct::add);
            return new ResponseEntity<List<Product>>(listProduct, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // lấy sản phầm bằng id
    public ResponseEntity<Product> getProductById(Integer id) {
        try {
            Optional<Product> _product = productRepository.findById(id);
            if(_product.isPresent()) {
                Product productResult = _product.get();
                return new ResponseEntity<Product>(productResult, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    // Tạo sản phẩm
    public ResponseEntity<Object> createProduct(Integer productLineId ,Product product) {
        try {
            Optional<ProductLine> productLineOptional = productLineRepository.findById(productLineId);
            if(productLineOptional.isPresent()) {
                Product newProduct = new Product();

                newProduct.setProductLine(productLineOptional.get());
                newProduct.setProductName(product.getProductName());
                newProduct.setProductCode(product.getProductCode());
                newProduct.setBuyPrice(product.getBuyPrice());
                newProduct.setPhoto1(product.getPhoto1());
                newProduct.setProductDescription(product.getProductDescription());

                return new ResponseEntity<>(productRepository.save(newProduct), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // sửa sản phẩm 
    public ResponseEntity<Object> updateProduct(Product product, Integer id) {
        try {
            Optional<Product> productOp = productRepository.findById(id);
            if(productOp.isPresent()) {
                Product newProduct = productOp.get();
                newProduct.setProductCode(product.getProductCode());
                newProduct.setProductName(product.getProductName());
                newProduct.setBuyPrice(product.getBuyPrice());
                newProduct.setPhoto1(product.getPhoto1());
                newProduct.setProductDescription(product.getProductDescription());
                return new ResponseEntity<Object>(productRepository.save(newProduct), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
}
