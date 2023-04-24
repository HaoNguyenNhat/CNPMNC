package com.devcamp.springjwt.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "extension")
    private String extension;

    @Email
    @Column(name = "email")
    private String email;

    @Column(name = "office_code")
    private Integer officeCode;

    @Column(name = "report_to")
    private Integer reportTo;

    @Column(name = "job_tittle")
    private String jobTittle;
}
