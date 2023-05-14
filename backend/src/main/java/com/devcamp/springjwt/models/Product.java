package com.devcamp.springjwt.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "product_type")
    private String productType;
    
    @Column(name = "product_name")
    private String productName;

    @Column(name = "photo1")
    private String photo1;

    @Column(name = "product_description")
    private String productDescription;

    @Column(name = "buy_price")
    private Long buyPrice;

    @ManyToOne
    @JoinColumn(name = "product_line_id")
    private ProductLine productLine;

    @ManyToOne
    @JoinColumn(name = "orders_id")
    private Order order;
}
