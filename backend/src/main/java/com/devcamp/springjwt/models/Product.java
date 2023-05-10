package com.devcamp.springjwt.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(name = "product_scale")
    private String productScale;

    @Column(name = "product_vendor")
    private String productVendor;

    @Column(name = "quantity_stock")
    private Integer quantityInStock;

    @Column(name = "buy_price")
    private Long buyPrice;

    @ManyToOne
    @JoinColumn(name = "product_line_id")
    private ProductLine productLine;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<OrderDetail> OrderDetail;

}
